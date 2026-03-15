const storageKeys = {
  partners: 'tb_partners',
  affiliates: 'tb_affiliates',
  tours: 'tb_tours',
  bookings: 'tb_bookings',
};

const state = {
  partners: load(storageKeys.partners),
  affiliates: load(storageKeys.affiliates),
  tours: load(storageKeys.tours),
  bookings: load(storageKeys.bookings),
  latestDraft: null,
};

function load(key) {
  const raw = localStorage.getItem(key);
  return raw ? JSON.parse(raw) : [];
}

function save(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function createReferralCode(name, role) {
  const token = name.replace(/\s+/g, '').slice(0, 4).toUpperCase();
  const seed = Math.floor(Math.random() * 9000 + 1000);
  return `${role.slice(0, 3).toUpperCase()}-${token}-${seed}`;
}

function renderRows(rows, targetId, mapper) {
  const tbody = document.getElementById(targetId);
  tbody.innerHTML = rows.map(mapper).join('');
}

function render() {
  renderRows(state.partners, 'partners-body', (item) =>
    `<tr><td>${item.company}</td><td>${item.contact}</td><td>${item.email}</td><td>${item.destination}</td><td>${item.supplyType}</td></tr>`
  );

  renderRows(state.affiliates, 'affiliates-body', (item) =>
    `<tr><td>${item.name}</td><td>${item.role}</td><td>${item.niche}</td><td>${item.channel}</td><td>${item.code}</td></tr>`
  );

  document.getElementById('tour-list').innerHTML = state.tours
    .map((tour) => `<li><strong>${tour.name}</strong> — ${tour.destination}, ${tour.days} days, ${tour.style}</li>`)
    .join('');

  const tourSelect = document.getElementById('tour-select');
  tourSelect.innerHTML = state.tours.length
    ? state.tours.map((tour) => `<option value="${tour.id}">${tour.name}</option>`).join('')
    : '<option value="">No tours published yet</option>';

  renderRows(state.bookings, 'bookings-body', (item) =>
    `<tr><td>${item.traveler}</td><td>${item.tourName}</td><td>${item.pax}</td><td>${item.status}</td></tr>`
  );
}

function toObject(formElement) {
  return Object.fromEntries(new FormData(formElement).entries());
}

document.getElementById('partner-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const payload = toObject(event.target);
  state.partners.push(payload);
  save(storageKeys.partners, state.partners);
  event.target.reset();
  render();
});

document.getElementById('affiliate-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const payload = toObject(event.target);
  payload.code = createReferralCode(payload.name, payload.role);
  state.affiliates.push(payload);
  save(storageKeys.affiliates, state.affiliates);
  event.target.reset();
  render();
});

document.getElementById('ai-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const payload = toObject(event.target);

  const lines = [
    `Tour draft: ${payload.destination} ${payload.style} Escape`,
    `Duration: ${payload.days} days`,
    `Budget profile: ${payload.budget}`,
    '',
    'Sample itinerary:',
    'Day 1: Arrival + old city immersion + hosted dinner.',
    'Day 2: Signature landmarks + cultural storytelling.',
    'Day 3: Local artisan / food route + free discovery block.',
    'Day 4: Nature extension with photo stops + optional premium add-on.',
    `Day ${payload.days}: Departure support + upsell next-destination package.`,
    '',
    'Recommended partner stack: local guide + transfer partner + boutique stay + affiliate promo.',
  ];

  const draft = {
    id: crypto.randomUUID(),
    name: `${payload.destination} ${payload.style} Escape`,
    destination: payload.destination,
    days: payload.days,
    style: payload.style,
    budget: payload.budget,
    itinerary: lines.join('\n'),
  };

  state.latestDraft = draft;
  document.getElementById('ai-output').textContent = draft.itinerary;
  document.getElementById('publish-tour').disabled = false;
});

document.getElementById('publish-tour').addEventListener('click', () => {
  if (!state.latestDraft) {
    return;
  }

  state.tours.push(state.latestDraft);
  save(storageKeys.tours, state.tours);
  state.latestDraft = null;
  document.getElementById('ai-output').textContent = 'Draft published to inventory.';
  document.getElementById('publish-tour').disabled = true;
  render();
});

document.getElementById('booking-form').addEventListener('submit', (event) => {
  event.preventDefault();
  if (!state.tours.length) {
    alert('Publish at least one tour first.');
    return;
  }

  const payload = toObject(event.target);
  const selected = state.tours.find((tour) => tour.id === payload.tour);

  if (!selected) {
    return;
  }

  state.bookings.push({
    traveler: payload.traveler,
    tourName: selected.name,
    pax: payload.pax,
    status: payload.status,
  });

  save(storageKeys.bookings, state.bookings);
  event.target.reset();
  render();
});

render();
