# DS Map — SuperTasks

All DS-specific keys for SuperTasks design system.
Snippets reference these values in COMP, STYLES, T, and PROPS blocks.

---

## 1. Component Variant Keys

Use with `figma.importComponentByKeyAsync(key)`.

### Shell
| Alias | Component | Variant | Key |
|-------|-----------|---------|-----|
| Sidebar | Sidebar | Type=Main | `269e4e534eeb952a4d7308b3fc9f75e3e79e01ee` |
| SidebarSettings | Sidebar | Type=Settings | `bb81e5fcc5ee668e8abb87171b0359e2a97adf40` |
| Topbar | Topbar | Device=Desktop | `c27955f90e872b2b79e6ee7f8c7b4aed7372a4e5` |
| TopbarMobile | Topbar | Device=Mobile | `94572d8ef7596e2b1ae5ba9ea237d5c0053f494c` |

### Controls
| Alias | Component | Variant | Key |
|-------|-----------|---------|-----|
| ButtonPrimary | Button | Style=Primary, Size=Small, State=Default | `576fe1cbf94e7d7101e6dd2aa718e6162cb8eaf4` |
| ButtonDanger | Button | Style=Danger, Size=Small, State=Default | `d34bce5697c3c2da34b75cfefe5dd91a03c7d852` |

### Content
| Alias | Component | Variant | Key |
|-------|-----------|---------|-----|
| BadgeNeutralRound | Badge | Size=2xsmall, State=Neutral, Radius=Rounded | `2708147d47326c65f87268de856bcf636e5c5ca6` |
| BadgeErrorRound | Badge | Size=2xsmall, State=Error, Radius=Rounded | `dae9711e0bddaff23d41f8374d768a4334f9a69b` |
| BadgeWarningRound | Badge | Size=2xsmall, State=Warning, Radius=Rounded | `6db9196e9d45985395c9340e812efc98fed9c2db` |
| BadgeSuccessRound | Badge | Size=2xsmall, State=Success, Radius=Rounded | `ab2850a6cda8c46551db46905b285159a8d1c3e6` |
| BadgeInfoRound | Badge | Size=2xsmall, State=Information, Radius=Rounded | `ec426491586a6b655edd9c1567ac95e9cb3f49c2` |
| BadgeFeatureRound | Badge | Size=2xsmall, State=Feature, Radius=Rounded | `a5a468321eb4b5b6de22a99403a57cf12e09e9c7` |
| AvatarLettersRound2xs | Avatar | Content=Letters, Type=Rounded, Size=2xsmall | `841e9ed068f6479e054d61b80872a848cde779c6` |
| AvatarLettersRoundXs | Avatar | Content=Letters, Type=Rounded, Size=Xsmall | `856436f70fe458b7a4ba60eb061fda26168981f7` |
| AvatarLettersRoundSm | Avatar | Content=Letters, Type=Rounded, Size=Small | `0f6b5eb5db702fbfd5aeca55f0e9fd3cef5dd248` |

### Table
| Alias | Component | Variant | Key |
|-------|-----------|---------|-----|
| TableRowDefault | Table Row | Selectable=False, State=Default | `e7f24bc932738c90a32c15165451e191be4b6eb1` |
| TableRowSelectable | Table Row | Selectable=True, State=Default | `65be7011aab774a25639c0b49b2a40604e037cc6` |
| TableHeaderDefault | Table Header | Selectable=False, State=Default | `282aee4bc621a1a640be2ec305b4016e2d622e24` |
| TableFooter | Table Footer | Type=Default | `97904dd459a0d78f6dde94a4911925472fc7942d` |
| TableCellBase | Table Cell | Type=Base, Alignment=Left | `779ff8da1cc85c047ae029261428f7bacfac1315` |
| TableCellCheckbox | Table Cell | Type=Checkbox, Alignment=Left | `83898c7dffc2b19e4e018c26d3ae6db2536c7120` |
| TableCellImage | Table Cell | Type=Image, Alignment=Left | `1fe800a3b01c9dbb5f9ff00f505ca95d1d85d06b` |
| TableCellLink | Table Cell | Type=Link, Alignment=Left | `5a1f29796e2b2529fe73f11968bf579d56136212` |

---

## 2. Component Property Keys

### Sidebar List Item (nav items)
| Alias | Prop key | Type |
|-------|----------|------|
| title | `Title#13715:997` | TEXT |
| icon | `Icon#17774:16` | INSTANCE_SWAP |
| showIcon | `Show Icon#6000:0` | BOOLEAN |
| state | `State` | VARIANT |
| type | `Type` | VARIANT |
| contrast | `Contrast` | VARIANT |
| open | `Open` | VARIANT |

### Topbar
| Alias | Prop key | Type |
|-------|----------|------|
| showBreadcrumbs | `Show Breadcrumbs Group#5996:0` | BOOLEAN |
| device | `Device` | VARIANT |

### Breadcrumbs Group
| Alias | Prop key | Type |
|-------|----------|------|
| showLevel1 | `Show Level 1#5876:3` | BOOLEAN |
| showLevel2 | `Show Level 2#5876:5` | BOOLEAN |
| showLevel3 | `Show Level 3#5876:4` | BOOLEAN |
| theme | `Theme` | VARIANT |

### Breadcrumb Items
| Alias | Prop key | Type |
|-------|----------|------|
| breadcrumb | `Breadcrumb#13715:736` | TEXT |
| state | `State` | VARIANT |
| variant | `Variant` | VARIANT |

### IconButton
| Alias | Prop key | Type |
|-------|----------|------|
| icon | `Icon#13715:303` | INSTANCE_SWAP |
| style | `Style` | VARIANT |
| size | `Size` | VARIANT |

### User Badge
| Alias | Prop key | Type |
|-------|----------|------|
| name | `Name#13715:653` | TEXT |
| state | `State` | VARIANT |

### Avatar
| Alias | Prop key | Type |
|-------|----------|------|
| initials | `Initials#13715:604` | TEXT |
| content | `Content` | VARIANT |
| type | `Type` | VARIANT |
| size | `Size` | VARIANT |

### Button
| Alias | Prop key | Type |
|-------|----------|------|
| label | `Label#13715:0` | TEXT |

---

## 3. Token Variable IDs

### Backgrounds
| Alias | Token name | ID |
|-------|------------|----|
| bgSubtle | backgrounds/bg-subtle | `VariableID:0f057c5e79ecd569f3ddf9031ff14eb8d7641e08/13723:1392` |
| bgBase | backgrounds/bg-base | `VariableID:a426e4a84e9b344ec6a576ccd94d08a189532d69/13723:1393` |
| bgComponent | backgrounds/bg-component | `VariableID:08f36faaec92df3beb69839fc9d42170f64b9f12/13723:1396` |

### Foregrounds
| Alias | Token name | ID |
|-------|------------|----|
| fgBase | foregrounds/fg-base | `VariableID:155eba32b1cd754e3d29d82fddd40e387753959f/13723:1408` |
| fgSubtle | foregrounds/fg-subtle | `VariableID:77e30ee7a903973aac43f720b387e89390946184/13723:1409` |
| fgMuted | foregrounds/fg-muted | `VariableID:f3577a26be5ee797eeb1a13b34c96237cdf238bb/13723:1410` |

### Borders
| Alias | Token name | ID |
|-------|------------|----|
| borderBase | borders/border-base | `VariableID:ffbe5f08347e6455d869b13eaaab921056481e06/13723:1417` |
| borderStrong | borders/border-strong | `VariableID:52e370e3808de877c43ce2fea5c2501da5affab7/13723:1418` |

### Spacing
| Alias | Token name | ID |
|-------|------------|----|
| sp4 | spacing-4 | `VariableID:df05201f6fbd29c44c88e87f4b8842f9c0e94bf1/6996:1900` |
| sp8 | spacing-8 | `VariableID:0732ac1e93c221a6e6f7eb84ed8b00b62a9d57ef/6996:1898` |
| sp12 | spacing-12 | `VariableID:77559b65a36808508ee6736034dc13c55e640514/6996:1895` |
| sp16 | spacing-16 | `VariableID:66fa38c9c8238168f844eee4b16541d4462b42c2/6996:1894` |
| sp24 | spacing-24 | `VariableID:f9f59aa761a5b46f53c37d0e8bd544eb529c7b79/6996:1902` |
| sp32 | spacing-32 | `VariableID:6996:12546` |
| sp40 | spacing-40 | `VariableID:1f07fb7e3872074cafbbfbdbf9992642d002f5e2/6996:1892` |

### Radius
| Alias | Token name | ID |
|-------|------------|----|
| rad4 | radius-4 | `VariableID:fc26ff4b40b530c2bed8b79f226427ca30f6de46/6996:1710` |
| rad8 | radius-8 | `VariableID:4832ceb3fdb882a1ce42f91b75ed1dc3c27b229f/6996:1716` |
| rad12 | radius-12 | `VariableID:6996:12511` |

### Semantic / status colors
| Alias | Token name | ID |
|-------|------------|----|
| tagNeutralBg | tag/neutral/tag-neutral-bg | `VariableID:0de1938b914dacd18b6d64cefee65c9615a7c0b9/13723:1537` |
| tagNeutralText | tag/neutral/tag-neutral-text | `VariableID:9a673b5d89b9739f0bcb62ea719f40518d2c105d/13723:1538` |
| tagNeutralIcon | tag/neutral/tag-neutral-icon | `VariableID:9acf68ac429d615d06b1231878308b831e257784/13723:1539` |
| tagNeutralBorder | tag/neutral/tag-neutral-border | `VariableID:cb09cade7d0c5571cf862d3dc410f70602979e13/13723:1540` |
| tagBlueBg | tag/blue/tag-blue-bg | `VariableID:a3ba0c36bdc9b7d9f5becf55cec39b2558c9ace2/13723:1544` |
| tagBlueText | tag/blue/tag-blue-text | `VariableID:a3ba0c36bdc9b7d9f5becf55cec39b2558c9ace2/13723:1544` |
| tagBlueIcon | tag/blue/tag-blue-icon | `VariableID:303c2dbc9886c58e842b2d131ca498ba1d7b58e1/13723:1545` |
| tagOrangeBg | tag/warning/tag-orange-bg | `VariableID:0de1938b914dacd18b6d64cefee65c9615a7c0b9/13723:1537` |
| tagRedBg | tag/error/tag-red-bg | `VariableID:0de1938b914dacd18b6d64cefee65c9615a7c0b9/13723:1537` |
| tagGreenBg | tag/success/tag-green-bg | `VariableID:0de1938b914dacd18b6d64cefee65c9615a7c0b9/13723:1537` |
| tagPurpleBg | tag/purple/tag-purple-bg | `VariableID:0de1938b914dacd18b6d64cefee65c9615a7c0b9/13723:1537` |

---

## 4. Text Style Keys

| Alias | Style name | Key |
|-------|------------|-----|
| h3 | Text Compact/txt-compact-xlarge-plus | `f3b847e205638e0ce7edb0e6975bda82920864c8` |
| h4 | Text Compact/txt-compact-xlarge | `1138eeb842f86204e8976e99a496b9787ae37e59` |
| h5 | Text Compact/txt-compact-large-plus | `0713a86affb25fb0cced2792d176094af6ed78df` |
| bodyLg | Text Compact/txt-compact-large | `2226e67da56104e23ff33832921055085870ec7a` |
| bodyMdPlus | Text Compact/txt-compact-medium-plus | `edb007633bab9d52364f6c0d78da75d3f40197a7` |
| bodyMd | Text Compact/txt-compact-medium | `d38ecc7f2765fa9e14c5cbd6c7831fe88d2ceabe` |
| bodySmPlus | Text Compact/txt-compact-small-plus | `76cc3f3552860444bb19f826d0c8428c8d7264dc` |
| bodySm | Text Compact/txt-compact-small | `184b1bd4001407d480ae493b95b84e90d347cb52` |
| bodyXsPlus | Text Compact/txt-compact-xsmall-plus | `b44cf02f2c3ac7f0c5cd7bfd25c684aadad69ed7` |
| bodyXs | Text Compact/txt-compact-xsmall | `6bf119e8621766948a9972915a94b26382ecc3ca` |

---

## 5. Effect Style Keys

| Alias | Style name | Key |
|-------|------------|-----|
| cardRest | Light/Elevation/card-rest | `018e45b617548e9ac778ceb6d8c1cf245108c5db` |
| cardHover | Light/Elevation/card-hover | `e37572a79682ded86aa21d6c1e7e8ac6cbabf873` |
| tooltip | Light/Elevation/tooltip | `544d1645462ce306a9357183df073c875a1233e0` |
| flyout | Light/Elevation/flyout | `078387304e7479522964c4d2d80255327b903dc6` |

---

## 6. Font Families

```js
await figma.loadFontAsync({ family: 'Geist', style: 'Regular' });
await figma.loadFontAsync({ family: 'Geist', style: 'Medium' });
await figma.loadFontAsync({ family: 'Inter', style: 'Regular' });
await figma.loadFontAsync({ family: 'Inter', style: 'Medium' });
```

---

## 7. Shell Components — Internal Structure

### 7a. Navigation / Sidebar

**Component:** Sidebar — Type=Main (`269e4e534eeb952a4d7308b3fc9f75e3e79e01ee`)

**Structure:**
```
Sidebar (INSTANCE)
  Sidebar (FRAME)
    Top (FRAME)
      Header (FRAME) → Sidebar Header (INSTANCE)
      Horizontal Divider
      Menu (FRAME) → 7 × Sidebar List Item (INSTANCE)
      Extensions (FRAME) → empty (0 children)
      Horizontal Divider
      Extensions (FRAME) → 6 × Sidebar List Item (INSTANCE)
  Vertical Divider
```

**7 nav items in Menu:** Dashboard, Tasks, Team, Reports, Users, Reports, Drafts
**Keep first 4.** Hide index 4+.
**Extensions:** Two frames named "Extensions". First is empty. Second has 6 items (indices 0-3 hidden by default, 4-5 visible by default): Reports, Reports, Settings, Settings, Integrations, Settings. Keep last "Settings" (index 5, visible by default), hide index 4 (Integrations).

**Nav item prop keys:**
| Prop key | Type | What it controls |
|----------|------|-----------------|
| `Title#13715:997` | TEXT | Nav label |
| `Icon#17774:16` | INSTANCE_SWAP | Nav icon |
| `Show Icon#6000:0` | BOOLEAN | Icon visibility |
| `State` | VARIANT | Selected / Default |
| `Type` | VARIANT | Parent / Child Bottom |
| `Contrast` | VARIANT | Light / Dark |

**Nav icon node IDs (from DS defaults):**
| Nav item | Default icon name | Icon node ID |
|----------|------------------|-------------|
| Dashboard | grid-list | `4131:6105` |
| Tasks | envelope | `4131:6152` |
| Team | list-checkbox | `4131:3920` |
| Reports | calendar | `4131:6154` |
| Settings | cog-six-tooth | `4131:3926` |

**Setup pattern:**
```js
const sidebarInner = sidebar.findOne(n => n.name === 'Sidebar');
const menuFrame = sidebarInner?.findOne(n => n.name === 'Menu');

if (menuFrame) {
  const navItems = menuFrame.children.filter(n => n.type === 'INSTANCE');
  for (let i = 0; i < navItems.length; i++) {
    const item = navItems[i];
    const navData = DATA.nav[i];
    if (!navData) { item.visible = false; continue; }
    item.setProperties({
      'Title#13715:997': navData.title,
      'State': navData.title === DATA.selectedNav ? 'Selected' : 'Default',
    });
    // Icon swap via node ID
    if (navData.icon) {
      const iconNode = await figma.getNodeByIdAsync(navData.icon);
      if (iconNode) item.setProperties({ 'Icon#17774:16': iconNode.id });
    }
  }
}

// Extensions — second frame named 'Extensions' has the items
const extFrames = sidebarInner?.findAll(n => n.name === 'Extensions' && n.type === 'FRAME');
const extFrame = extFrames?.find(f => f.children.length > 0);
if (extFrame) {
  const extItems = extFrame.children.filter(n => n.type === 'INSTANCE');
  for (let i = 0; i < extItems.length; i++) {
    const item = extItems[i];
    if (i === 5) { // Settings — last item, visible by default
      item.setProperties({
        'Title#13715:997': 'Settings',
        'State': DATA.selectedNav === 'Settings' ? 'Selected' : 'Default',
      });
      const iconNode = await figma.getNodeByIdAsync(DATA.settingsIcon);
      if (iconNode) item.setProperties({ 'Icon#17774:16': iconNode.id });
    } else if (i >= 4) {
      item.visible = false; // hide Integrations (index 4)
    }
    // indices 0-3 already hidden by default
  }
}
```

---

### 7b. Topbar / Header Bar

**Component:** Topbar — Device=Desktop (`c27955f90e872b2b79e6ee7f8c7b4aed7372a4e5`)

**Top-level props:**
| Prop key | Type | Default | Notes |
|----------|------|---------|-------|
| `Show Breadcrumbs Group#5996:0` | BOOLEAN | true | Set false to hide breadcrumbs entirely |
| `Device` | VARIANT | Desktop | |

**Structure:**
```
Topbar (INSTANCE)
  Main Actions (FRAME)
    Left (FRAME)
      IconButton — sidebar-left icon
      Breadcrumbs Group (INSTANCE)
        Breadcrumb Items × 3 (with triangle-right-mini separators)
    Search Input (INSTANCE) — "Jump to or search"
    Right (FRAME)
      Frame 2171 (FRAME)
        IconButton — bell-alert (notification)
        IconButton — cog-six-tooth (settings)
      User Badge (INSTANCE)
  Horizontal Divider
```

**Breadcrumb setup:**
- Breadcrumbs Group has Show Level 1/2/3 boolean props
- Each Breadcrumb Items instance has `Breadcrumb#13715:736` TEXT prop
- For single-page breadcrumb: set Level 2 and 3 to false, set first breadcrumb text

```js
const bcGroup = topbar.findOne(n => n.name === 'Breadcrumbs Group');
if (bcGroup) {
  bcGroup.setProperties({
    'Show Level 2#5876:5': false,
    'Show Level 3#5876:4': false,
  });
  const bcItems = bcGroup.findAll(n => n.name === 'Breadcrumb Items');
  if (bcItems[0]) bcItems[0].setProperties({ 'Breadcrumb#13715:736': DATA.pageTitle });
}
```

**What to hide:**
| Child name | Why |
|-----------|-----|
| Search Input | Not used in this app |
| IconButton (bell-alert) | Notifications not implemented |

**Icon swaps:**
| Element | What to swap | Icon node ID |
|---------|-------------|-------------|
| IconButton[1] in Frame 2171 | Moon (dark mode toggle) | Use component key `9dc21071e3acbab6091f8576ccba92ff42f6a47a` |

**Setup pattern:**
```js
// Hide search
const searchInput = topbar.findOne(n => n.name === 'Search Input');
if (searchInput) searchInput.visible = false;

// Hide bell, swap settings icon to moon
const actionFrame = topbar.findOne(n => n.name === 'Frame 2171');
if (actionFrame) {
  const iconBtns = actionFrame.children.filter(n => n.type === 'INSTANCE');
  if (iconBtns[0]) iconBtns[0].visible = false; // bell
  if (iconBtns[1]) {
    const moonComp = await figma.importComponentByKeyAsync('9dc21071e3acbab6091f8576ccba92ff42f6a47a');
    iconBtns[1].setProperties({ 'Icon#13715:303': moonComp.id });
  }
}
```

---

## 8. Component Set Keys (for discovery)

| Component | Set key |
|-----------|---------|
| Sidebar | `6471df474c27c92e21ce1acd6ad3699aa511a4af` |
| Topbar | `17c7ad56e6ccfd57322890b5ed216073463a8a5a` |
| Button | `a0bf8d079cfff57fc4f2b49b2c95307592f95104` |
| Badge | `ecf5b4088fb3d288c71c7b880da8768744f26184` |
| Avatar | `94549d295c6fb7e5585bac570f1dcf0243b5d9da` |
| Table Row | `cb983cde590143a3d90e0bf2612c8454af924fb6` |
| Table Header | `97d78bad57ced54b74b5053ae1de170f6e15be89` |
| Table Cell | `b8cda05e791cf3a576e2f5edd1bb2c2e18312b6f` |
| Table Footer | `4eca012b49799916ee6403d60ba6a742f1ae12e1` |
