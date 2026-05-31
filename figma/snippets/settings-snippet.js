// settings-snippet.js — Settings page content (all tabs data-driven)
// Renders: page header, left nav, right content card. Tab content driven by DATA.activeTab.

// ── DATA (from data.yaml → settings) ──
/* __DATA__ */
const DATA = {
  activeTab: 'Profile',
  tabs: ['Profile', 'Notifications', 'Security', 'Billing'],
  profile: {
    title: 'Profile',
    subtitle: 'Update your personal information',
    user: { name: 'Ludvig Rask', initials: 'L', bgToken: 'tagOrangeBg', textToken: 'tagOrangeText' },
    fields: [
      { label: 'Full name', value: 'Ludvig Rask', row: 1 },
      { label: 'Email', value: 'ludvig@taskflow.io', row: 1 },
      { label: 'Job title', value: 'Product Designer', row: 2 },
      { label: 'Phone', value: '+1 (555) 000-0000', row: 2 },
      { label: 'Location', value: 'San Francisco, CA', row: 3 },
      { label: 'Time zone', value: 'Pacific Time (UTC-8)', row: 3 },
    ],
    photoHint: 'Click to change photo',
    bio: '',
    action: 'Save changes',
  },
  notifications: {
    title: 'Notifications',
    subtitle: 'Manage how you receive alerts',
    toggles: [
      { label: 'Email notifications', desc: 'Receive email for task assignments', on: true },
      { label: 'Push notifications', desc: 'Get push alerts for due dates', on: true },
      { label: 'Weekly digest', desc: "Summary of your team's progress", on: false },
      { label: 'Mentions', desc: 'Notify when someone mentions you', on: true },
      { label: 'Overdue alerts', desc: 'Alert when tasks pass their due date', on: true },
    ],
    action: 'Save changes',
  },
  security: {
    title: 'Security',
    subtitle: 'Manage your security preferences',
    toggles: [
      { label: 'Two-factor authentication', desc: 'Add an extra layer of security to your account', on: false },
      { label: 'Login alerts', desc: 'Get notified when a new device signs in', on: true },
      { label: 'Session timeout', desc: 'Automatically sign out after 30 minutes of inactivity', on: false },
      { label: 'Require password change', desc: 'Force password update every 90 days', on: true },
      { label: 'SSO enforcement', desc: 'Require single sign-on for all team members', on: false },
    ],
    action: 'Save changes',
  },
  billing: {
    title: 'Billing',
    subtitle: 'Manage your plan and payment',
    historyTitle: 'Billing history',
    plan: { name: 'Pro plan', price: '$12/month', renews: 'Renews on Apr 15, 2026', action: 'Change plan' },
    payment: { label: 'Payment method', value: 'Visa ending in 4242', action: 'Update' },
    history: [
      { date: 'Mar 1, 2026', desc: 'Pro Plan — Monthly', amount: '$12.00' },
      { date: 'Feb 1, 2026', desc: 'Pro Plan — Monthly', amount: '$12.00' },
      { date: 'Jan 1, 2026', desc: 'Pro Plan — Monthly', amount: '$12.00' },
    ],
  },
};

// ── Component keys ──
const COMP = {
  divider: '5b0928ffff3b77cdb0a9de765092cb23d1e04657',
  button: '576fe1cbf94e7d7101e6dd2aa718e6162cb8eaf4',
  textInput: 'e7c9b8a059736b0790d8fc980ded5173546941e7',
  textArea: 'bd1f5406d356ddd230c8f16d424fb22f9886c325',
  avatar: '841e9ed068f6479e054d61b80872a848cde779c6',
  avatarImageXl: '900150d5b46c1301cffd22da2810bc80d5f41fee',
  switch: '8a3f273f9bd3c8ea97ec9fd0e4268e67e8d2b041',
  label: '9855219e4e5c7dd4834dacff3c39d8cc09565cdd',
  cellHeader: 'ea005a34a6c9afff258391b28e8bbec799b41d90',
  cellBase: '779ff8da1cc85c047ae029261428f7bacfac1315',
  cellSubtle: '59549d2b30c127ec5a228a101460c6a36be64339',
};

// ── Text styles ──
const STYLES = {
  h1: '03806342a7fa5481e1fa2bf60bba9a10213b82e5',
  h3: '519b127faf43433cea7182293137df5935e12ad4',
  txtSmall: '293209460cb844f3b3feacdbdb0d2c4205b35035',
  txtCompactSmallPlus: '76cc3f3552860444bb19f826d0c8428c8d7264dc',
  txtCompactMedPlus: 'edb007633bab9d52364f6c0d78da75d3f40197a7',
  txtCompactSmall: '184b1bd4001407d480ae493b95b84e90d347cb52',
};

// ── Effect styles ──
const EFFECTS = {
  cardRest: '018e45b617548e9ac778ceb6d8c1cf245108c5db',
};

// ── Tokens ──
const T = {
  bgBase: 'VariableID:a426e4a84e9b344ec6a576ccd94d08a189532d69/17968:59',
  bgSubtle: 'VariableID:0f057c5e79ecd569f3ddf9031ff14eb8d7641e08/17968:46',
  fgBase: 'VariableID:155eba32b1cd754e3d29d82fddd40e387753959f/17968:47',
  fgMuted: 'VariableID:f3577a26be5ee797eeb1a13b34c96237cdf238bb/17968:159',
  fgSubtle: 'VariableID:77e30ee7a903973aac43f720b387e89390946184/17968:158',
  borderSubtle: 'VariableID:26e0b3a42c61f6a3cdd28a138ed083d8a6deacc8/17834:21',
  borderInteractive: 'VariableID:19a7cbd8752781f779f5a3d25905c3e1a39432d4/13723:1419',
  tagOrangeBg: 'VariableID:e5a19807780182e3813147e1d027b07ba19d68b6/13723:2158',
  tagOrangeText: 'VariableID:c2417b7057d2a4dd0d31322b507896e316263bea/13723:1550',
  sp12: 'VariableID:77559b65a36808508ee6736034dc13c55e640514/6996:1895',
};

// ── Frozen logic ──
await Promise.all([
  figma.loadFontAsync({ family: 'Geist', style: 'Medium' }),
  figma.loadFontAsync({ family: 'Geist', style: 'Regular' }),
  figma.loadFontAsync({ family: 'Inter', style: 'Regular' }),
  figma.loadFontAsync({ family: 'Inter', style: 'Medium' }),
]);

const V = async (id) => {
  const v = await figma.variables.getVariableByIdAsync(id);
  if (!v) throw new Error(`Variable not found: ${id}`);
  return v;
};
const SOLID = async (id) => {
  const v = await V(id);
  let c = v.valuesByMode[Object.keys(v.valuesByMode)[0]];
  while (c?.type === 'VARIABLE_ALIAS') {
    const av = await figma.variables.getVariableByIdAsync(c.id);
    if (!av) break;
    c = av.valuesByMode[Object.keys(av.valuesByMode)[0]];
  }
  const rgb = (c && typeof c.r === 'number') ? { r: c.r, g: c.g, b: c.b } : { r: 1, g: 1, b: 1 };
  return figma.variables.setBoundVariableForPaint(
    { type: 'SOLID', color: rgb, opacity: 1 }, 'color', v
  );
};

const imp = {};
const _compEntries = Object.entries(COMP);
const _compResults = await Promise.all(_compEntries.map(([, key]) => figma.importComponentByKeyAsync(key)));
for (let i = 0; i < _compEntries.length; i++) imp[_compEntries[i][0]] = _compResults[i];

const sty = {};
for (const [k, key] of Object.entries(STYLES)) {
  const s = await figma.importStyleByKeyAsync(key);
  sty[k] = s.id;
}

const eff = {};
for (const [k, key] of Object.entries(EFFECTS)) {
  const s = await figma.importStyleByKeyAsync(key);
  eff[k] = s.id;
}

// ── Render helpers ──
function mkFrame(name, opts = {}) {
  const f = figma.createFrame();
  f.name = name;
  f.layoutMode = opts.dir || 'VERTICAL';
  f.primaryAxisSizingMode = opts.mainSize || 'AUTO';
  f.counterAxisSizingMode = opts.crossSize || 'FIXED';
  f.fills = []; f.clipsContent = false;
  return f;
}
function setProps(inst, overrides) {
  const props = {}, cp = inst.componentProperties;
  for (const [k, v] of Object.entries(overrides))
    for (const cpk of Object.keys(cp))
      if (cpk === k || cpk.startsWith(k + '#')) { props[cpk] = v; break; }
  if (Object.keys(props).length) inst.setProperties(props);
}
async function setText(parent, name, chars) {
  const t = parent.findOne(n => n.type === 'TEXT' && n.name === name);
  if (t) { await figma.loadFontAsync(t.fontName); t.characters = chars; }
  return t;
}
async function colorAvatar(inst, bgToken, textToken) {
  const inner = inst.findOne(n => (n.type === 'FRAME' || n.type === 'RECTANGLE') && n.fills?.length > 0) || inst;
  if (inner.fills?.length) inner.fills = [await SOLID(T[bgToken])];
  const txt = inst.findOne(n => n.type === 'TEXT');
  if (txt) { await figma.loadFontAsync(txt.fontName); txt.fills = [await SOLID(T[textToken])]; }
}
async function mkLabel(text) {
  const inst = imp.label.createInstance();
  inst.name = text;
  setProps(inst, { Label: text, 'Show Optional': false, 'Show Tooltip': false });
  await setText(inst, 'Label', text);
  return inst;
}
async function mkFilledInput(value) {
  const inst = imp.textInput.createInstance();
  inst.name = 'Text Input';
  setProps(inst, { State: 'Filled' });
  await setText(inst, 'Placeholder', value);
  return inst;
}
function mkDivider(parent) {
  const d = imp.divider.createInstance();
  if (parent) { parent.appendChild(d); d.layoutSizingHorizontal = 'FILL'; }
  return d;
}

// ── Render ──
const tab = DATA.activeTab.toLowerCase();
const tabData = DATA[tab];

const root = mkFrame('Settings Content', { dir: 'HORIZONTAL' });
root.itemSpacing = 24;
root.resize(960, 100);
root.layoutSizingVertical = 'HUG';

// ── Left nav ──
const nav = mkFrame('Settings Nav');
nav.resize(240, 100);
nav.layoutSizingVertical = 'HUG';
nav.itemSpacing = 0;
nav.cornerRadius = 8;
nav.fills = [await SOLID(T.bgBase)];
await nav.setEffectStyleIdAsync(eff.cardRest);
nav.clipsContent = true;
nav.paddingTop = 8; nav.paddingBottom = 8;
root.appendChild(nav);

for (const tabName of DATA.tabs) {
  const isActive = tabName === DATA.activeTab;
  const item = mkFrame(tabName, { dir: 'HORIZONTAL', mainSize: 'FIXED', crossSize: 'AUTO' });
  item.paddingTop = 10; item.paddingBottom = 10;
  item.paddingLeft = 16; item.paddingRight = 16;
  item.counterAxisAlignItems = 'CENTER';
  if (isActive) {
    item.fills = [await SOLID(T.bgSubtle)];
    item.strokesIncludedInLayout = false;
    item.strokes = [await SOLID(T.fgBase)];
    item.strokeWeight = 2;
    item.strokeAlign = 'INSIDE';
    item.strokeTopWeight = 0; item.strokeRightWeight = 0; item.strokeBottomWeight = 0;
    item.strokeLeftWeight = 2;
  }
  nav.appendChild(item);
  item.layoutSizingHorizontal = 'FILL';

  const label = figma.createText();
  label.name = 'Label'; label.characters = tabName;
  await label.setTextStyleIdAsync(isActive ? sty.txtCompactSmallPlus : sty.txtCompactSmall);
  label.fills = [await SOLID(isActive ? T.fgBase : T.fgSubtle)];
  item.appendChild(label);
}

// ── Right content card ──
const card = mkFrame('Content Card');
card.cornerRadius = 8;
card.fills = [await SOLID(T.bgBase)];
await card.setEffectStyleIdAsync(eff.cardRest);
card.itemSpacing = 0;
card.clipsContent = true;
root.appendChild(card);
card.layoutSizingHorizontal = 'FILL';
card.layoutSizingVertical = 'HUG';

// Card header
const cardHeader = mkFrame('Card Header');
cardHeader.paddingTop = 12; cardHeader.paddingBottom = 12;
cardHeader.paddingLeft = 24; cardHeader.paddingRight = 24;
cardHeader.itemSpacing = 4;
card.appendChild(cardHeader);
cardHeader.layoutSizingHorizontal = 'FILL';

const cardTitle = figma.createText();
cardTitle.name = 'Title'; cardTitle.characters = tabData.title;
await cardTitle.setTextStyleIdAsync(sty.h3);
cardTitle.fills = [await SOLID(T.fgBase)];
cardHeader.appendChild(cardTitle);

mkDivider(card);

// Card body
const cardBody = mkFrame('Card Body');
cardBody.paddingTop = 24; cardBody.paddingBottom = 24;
cardBody.paddingLeft = 24; cardBody.paddingRight = 24;
const spacingByTab = { profile: 20, notifications: 20, security: 20, billing: 20 };
cardBody.itemSpacing = spacingByTab[tab] || 20;
card.appendChild(cardBody);
cardBody.layoutSizingHorizontal = 'FILL';

// ══════════════════════════════════════
// TAB: Profile
// ══════════════════════════════════════
if (tab === 'profile') {
  // Avatar row
  const avatarRow = mkFrame('Avatar Row', { dir: 'HORIZONTAL', crossSize: 'AUTO' });
  avatarRow.itemSpacing = 12; avatarRow.counterAxisAlignItems = 'CENTER';
  cardBody.appendChild(avatarRow);
  avatarRow.layoutSizingHorizontal = 'FILL';

  const av = imp.avatarImageXl.createInstance();
  av.name = 'Avatar';
  avatarRow.appendChild(av);

  const avatarInfo = mkFrame('Avatar Info');
  avatarInfo.itemSpacing = 2;
  avatarRow.appendChild(avatarInfo);

  const userName = figma.createText();
  userName.name = 'Name'; userName.characters = tabData.user.name;
  await userName.setTextStyleIdAsync(sty.h3);
  userName.fills = [await SOLID(T.fgBase)];
  avatarInfo.appendChild(userName);

  const photoHint = figma.createText();
  photoHint.name = 'Hint'; photoHint.characters = DATA.profile.photoHint;
  await photoHint.setTextStyleIdAsync(sty.txtCompactSmall);
  photoHint.fills = [await SOLID(T.fgSubtle)];
  avatarInfo.appendChild(photoHint);

  // Field rows (grouped by row number)
  const rowNums = [...new Set(tabData.fields.map(f => f.row))];
  for (const rn of rowNums) {
    const rowFields = tabData.fields.filter(f => f.row === rn);
    const row = mkFrame('Row ' + rn, { dir: 'HORIZONTAL' });
    row.itemSpacing = 16;
    cardBody.appendChild(row);
    row.layoutSizingHorizontal = 'FILL';
    row.layoutSizingVertical = 'HUG';

    for (const field of rowFields) {
      const col = mkFrame(field.label + ' Field');
      col.itemSpacing = 6;
      row.appendChild(col);
      col.layoutSizingHorizontal = 'FILL';

      const lbl = await mkLabel(field.label);
      col.appendChild(lbl);
      lbl.layoutSizingHorizontal = 'FILL';

      const input = await mkFilledInput(field.value);
      col.appendChild(input);
      input.layoutSizingHorizontal = 'FILL';
    }
  }

  // Bio
  const bioGroup = mkFrame('Bio Field');
  bioGroup.itemSpacing = 6;
  cardBody.appendChild(bioGroup);
  bioGroup.layoutSizingHorizontal = 'FILL';

  const bioLabel = await mkLabel('Bio');
  bioGroup.appendChild(bioLabel);
  bioLabel.layoutSizingHorizontal = 'FILL';

  const bioInput = imp.textArea.createInstance();
  bioInput.name = 'Text Area';
  bioGroup.appendChild(bioInput);
  bioInput.layoutSizingHorizontal = 'FILL';

  // Action
  const actionRow = mkFrame('Actions', { dir: 'HORIZONTAL', crossSize: 'AUTO' });
  actionRow.primaryAxisAlignItems = 'MAX';
  cardBody.appendChild(actionRow);
  actionRow.layoutSizingHorizontal = 'FILL';

  const saveBtn = imp.button.createInstance();
  saveBtn.name = tabData.action;
  actionRow.appendChild(saveBtn);
  setProps(saveBtn, { Label: tabData.action, Style: 'Primary' });
}

// ══════════════════════════════════════
// TAB: Notifications
// ══════════════════════════════════════
if (tab === 'notifications') {
  const stack = mkFrame('stack');
  stack.setBoundVariable('itemSpacing', await V(T.sp12));
  cardBody.appendChild(stack);
  stack.layoutSizingHorizontal = 'FILL';

  for (let i = 0; i < tabData.toggles.length; i++) {
    const t = tabData.toggles[i];

    const toggleRow = mkFrame(t.label, { dir: 'HORIZONTAL', crossSize: 'AUTO' });
    toggleRow.primaryAxisAlignItems = 'SPACE_BETWEEN';
    toggleRow.counterAxisAlignItems = 'CENTER';
    const isLast = i === tabData.toggles.length - 1;
    stack.appendChild(toggleRow);
    toggleRow.layoutSizingHorizontal = 'FILL';

    const info = mkFrame('Info');
    info.itemSpacing = 4;
    toggleRow.appendChild(info);

    const name = figma.createText();
    name.name = 'Label'; name.characters = t.label;
    await name.setTextStyleIdAsync(sty.txtCompactSmallPlus);
    name.fills = [await SOLID(T.fgBase)];
    info.appendChild(name);

    const desc = figma.createText();
    desc.name = 'Description'; desc.characters = t.desc;
    await desc.setTextStyleIdAsync(sty.txtCompactSmall);
    desc.fills = [await SOLID(T.fgSubtle)];
    info.appendChild(desc);

    const sw = imp.switch.createInstance();
    sw.name = 'Switch';
    setProps(sw, { Checked: t.on ? 'True' : 'False' });
    toggleRow.appendChild(sw);

    if (!isLast) {
      mkDivider(stack);
    }
  }

  const actionRow = mkFrame('Actions', { dir: 'HORIZONTAL', crossSize: 'AUTO' });
  actionRow.primaryAxisAlignItems = 'MAX';
  actionRow.paddingTop = 8;
  cardBody.appendChild(actionRow);
  actionRow.layoutSizingHorizontal = 'FILL';

  const saveBtn = imp.button.createInstance();
  saveBtn.name = tabData.action;
  actionRow.appendChild(saveBtn);
  setProps(saveBtn, { Label: tabData.action, Style: 'Primary' });
}

// ══════════════════════════════════════
// TAB: Security
// ══════════════════════════════════════
if (tab === 'security') {
  const stack = mkFrame('stack');
  stack.setBoundVariable('itemSpacing', await V(T.sp12));
  cardBody.appendChild(stack);
  stack.layoutSizingHorizontal = 'FILL';

  for (let i = 0; i < tabData.toggles.length; i++) {
    const t = tabData.toggles[i];

    const toggleRow = mkFrame(t.label, { dir: 'HORIZONTAL', crossSize: 'AUTO' });
    toggleRow.primaryAxisAlignItems = 'SPACE_BETWEEN';
    toggleRow.counterAxisAlignItems = 'CENTER';
    stack.appendChild(toggleRow);
    toggleRow.layoutSizingHorizontal = 'FILL';

    const info = mkFrame('Info');
    info.itemSpacing = 4;
    toggleRow.appendChild(info);

    const name = figma.createText();
    name.name = 'Label'; name.characters = t.label;
    await name.setTextStyleIdAsync(sty.txtCompactSmallPlus);
    name.fills = [await SOLID(T.fgBase)];
    info.appendChild(name);

    const desc = figma.createText();
    desc.name = 'Description'; desc.characters = t.desc;
    await desc.setTextStyleIdAsync(sty.txtCompactSmall);
    desc.fills = [await SOLID(T.fgSubtle)];
    info.appendChild(desc);

    const sw = imp.switch.createInstance();
    sw.name = 'Switch';
    setProps(sw, { Checked: t.on ? 'True' : 'False' });
    toggleRow.appendChild(sw);

    if (i < tabData.toggles.length - 1) {
      mkDivider(stack);
    }
  }

  const actionRow = mkFrame('Actions', { dir: 'HORIZONTAL', crossSize: 'AUTO' });
  actionRow.primaryAxisAlignItems = 'MAX';
  actionRow.paddingTop = 8;
  cardBody.appendChild(actionRow);
  actionRow.layoutSizingHorizontal = 'FILL';

  const saveBtn = imp.button.createInstance();
  saveBtn.name = tabData.action;
  actionRow.appendChild(saveBtn);
  setProps(saveBtn, { Label: tabData.action, Style: 'Primary' });
}

// ══════════════════════════════════════
// TAB: Billing
// ══════════════════════════════════════
if (tab === 'billing') {
  // Plan card
  const planCard = mkFrame('Plan Card');
  planCard.cornerRadius = 8;
  planCard.fills = [await SOLID(T.bgBase)];
  await planCard.setEffectStyleIdAsync(eff.cardRest);
  planCard.clipsContent = true;
  planCard.paddingTop = 20; planCard.paddingBottom = 20;
  planCard.paddingLeft = 24; planCard.paddingRight = 24;
  planCard.itemSpacing = 4;
  cardBody.appendChild(planCard);
  planCard.layoutSizingHorizontal = 'FILL';

  const planHeader = mkFrame('Plan Header', { dir: 'HORIZONTAL', crossSize: 'AUTO' });
  planHeader.primaryAxisAlignItems = 'SPACE_BETWEEN';
  planHeader.counterAxisAlignItems = 'CENTER';
  planCard.appendChild(planHeader);
  planHeader.layoutSizingHorizontal = 'FILL';

  const planName = figma.createText();
  planName.name = 'Plan Name'; planName.characters = tabData.plan.name;
  await planName.setTextStyleIdAsync(sty.txtCompactSmallPlus);
  planName.fills = [await SOLID(T.fgBase)];
  planHeader.appendChild(planName);

  const planBtn = imp.button.createInstance();
  planBtn.name = tabData.plan.action;
  planHeader.appendChild(planBtn);
  setProps(planBtn, { Label: tabData.plan.action, Style: 'Secondary' });

  const planPrice = figma.createText();
  planPrice.name = 'Price'; planPrice.characters = tabData.plan.price;
  await planPrice.setTextStyleIdAsync(sty.h1);
  planPrice.fills = [await SOLID(T.fgBase)];
  planCard.appendChild(planPrice);

  const planRenew = figma.createText();
  planRenew.name = 'Renews'; planRenew.characters = tabData.plan.renews;
  await planRenew.setTextStyleIdAsync(sty.txtCompactSmall);
  planRenew.fills = [await SOLID(T.fgSubtle)];
  planCard.appendChild(planRenew);

  // Payment method
  const payRow = mkFrame('Payment', { dir: 'HORIZONTAL', crossSize: 'AUTO' });
  payRow.primaryAxisAlignItems = 'SPACE_BETWEEN';
  payRow.counterAxisAlignItems = 'CENTER';
  payRow.paddingTop = 8; payRow.paddingBottom = 8;
  cardBody.appendChild(payRow);
  payRow.layoutSizingHorizontal = 'FILL';

  const payInfo = mkFrame('Info');
  payInfo.itemSpacing = 4;
  payRow.appendChild(payInfo);

  const payLabel = figma.createText();
  payLabel.name = 'Label'; payLabel.characters = tabData.payment.label;
  await payLabel.setTextStyleIdAsync(sty.txtCompactSmallPlus);
  payLabel.fills = [await SOLID(T.fgBase)];
  payInfo.appendChild(payLabel);

  const payValue = figma.createText();
  payValue.name = 'Value'; payValue.characters = tabData.payment.value;
  await payValue.setTextStyleIdAsync(sty.txtCompactSmall);
  payValue.fills = [await SOLID(T.fgSubtle)];
  payInfo.appendChild(payValue);

  const payBtn = imp.button.createInstance();
  payBtn.name = tabData.payment.action;
  payRow.appendChild(payBtn);
  setProps(payBtn, { Label: tabData.payment.action, Style: 'Secondary' });

  // Billing history — inline table using DS cell components
  const histCols = [
    { header: 'Date', comp: 'cellSubtle', key: 'date', width: 'FILL' },
    { header: 'Description', comp: 'cellBase', key: 'desc', width: 'FILL' },
    { header: 'Amount', comp: 'cellSubtle', key: 'amount', width: 120 },
  ];

  const histCard = mkFrame('Billing history');
  histCard.cornerRadius = 12; histCard.itemSpacing = 0;
  histCard.fills = [await SOLID(T.bgBase)]; histCard.clipsContent = true;
  await histCard.setEffectStyleIdAsync(eff.cardRest);
  cardBody.appendChild(histCard); histCard.layoutSizingHorizontal = 'FILL';

  const histTitleWrap = mkFrame('Title Wrapper', { dir: 'HORIZONTAL', crossSize: 'AUTO' });
  histTitleWrap.paddingTop = 24; histTitleWrap.paddingBottom = 16;
  histTitleWrap.paddingLeft = 24; histTitleWrap.paddingRight = 24;
  histCard.appendChild(histTitleWrap); histTitleWrap.layoutSizingHorizontal = 'FILL';
  const histTitle = figma.createText(); histTitle.name = 'Title'; histTitle.characters = DATA.billing.historyTitle;
  await histTitle.setTextStyleIdAsync(sty.txtCompactMedPlus);
  histTitle.fills = [await SOLID(T.fgBase)]; histTitleWrap.appendChild(histTitle);

  const histTable = mkFrame('Table'); histTable.itemSpacing = 0;
  histCard.appendChild(histTable); histTable.layoutSizingHorizontal = 'FILL';

  const histHeader = mkFrame('Table Header', { dir: 'HORIZONTAL', mainSize: 'FIXED', crossSize: 'FIXED' });
  histHeader.resize(100, 48); histHeader.counterAxisAlignItems = 'CENTER';
  histHeader.itemSpacing = 12; histHeader.paddingLeft = 24; histHeader.paddingRight = 24;
  histHeader.fills = [await SOLID(T.bgSubtle)];
  histTable.appendChild(histHeader); histHeader.layoutSizingHorizontal = 'FILL';
  for (const col of histCols) {
    const cell = imp.cellHeader.createInstance(); histHeader.appendChild(cell);
    if (col.width === 'FILL') cell.layoutSizingHorizontal = 'FILL';
    else { cell.layoutSizingHorizontal = 'FIXED'; cell.resize(col.width, 48); }
    cell.layoutSizingVertical = 'FILL';
    await setText(cell, 'Label', col.header);
  }

  for (const entry of tabData.history) {
    mkDivider(histTable);
    const row = mkFrame(entry.desc, { dir: 'HORIZONTAL', mainSize: 'FIXED', crossSize: 'FIXED' });
    row.resize(100, 48); row.counterAxisAlignItems = 'CENTER';
    row.itemSpacing = 12; row.paddingLeft = 24; row.paddingRight = 24;
    row.fills = [await SOLID(T.bgBase)];
    histTable.appendChild(row); row.layoutSizingHorizontal = 'FILL';
    for (const col of histCols) {
      const cell = imp[col.comp].createInstance(); row.appendChild(cell);
      if (col.width === 'FILL') cell.layoutSizingHorizontal = 'FILL';
      else { cell.layoutSizingHorizontal = 'FIXED'; cell.resize(col.width, 48); }
      cell.layoutSizingVertical = 'FILL';
      await setText(cell, 'Label', entry[col.key]);
    }
  }
}

figma.currentPage.appendChild(root);
figma.viewport.scrollAndZoomIntoView([root]);
return { id: root.id, name: root.name, tab: DATA.activeTab, w: root.width, h: root.height };
