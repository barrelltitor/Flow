<img src="./images/logo.png" width="50%"/>

# **Plex-inspired theme for Jellyfin WebUI**
### **Built on [Scyfin](https://github.com/loof2736/scyfin/), [Ultrachromic](https://github.com/CTalvio/Ultrachromic)**

## Jellyfin 12 support

This branch supports the **Modern layout in Jellyfin 12.4** as well as the existing
Legacy layout. On desktop (900px and wider), Flow arranges Jellyfin's native toolbar
navigation as a fixed sidebar. Mobile keeps Jellyfin's swipeable drawer.
The CSS works by itself; the optional helper below replaces **More** with individual
library buttons on desktop.

The main, desktop/mobile one-liners and Stylus bundle include the compatibility
rules. Existing accent themes and the `Utils/Playlist*.css` overrides are preserved.
Use the imports below from this branch, then hard-refresh the web client. The older
10.11 compatibility stylesheet is still useful for the Legacy layout.

The experimental Drawer Toggle option is for the Legacy layout.

### Show every library in the desktop sidebar

With Flow's Jellyfin 12 CSS enabled, install the
[JavaScript Injector plugin](https://github.com/n00bcodr/Jellyfin-JavaScript-Injector)
and restart Jellyfin once. In the injector's settings, add an enabled custom script
and paste the contents of [JS/ScyFlow-All-Libraries.js](JS/ScyFlow-All-Libraries.js)
into its script field. Leave the external URL empty and module mode disabled.
Save, then refresh the browser. External script URLs do not need to be enabled.

The helper uses Jellyfin's existing library links, including their order, icons,
and selected state. The sidebar scrolls when needed. Mobile navigation stays native;
disabling the script and refreshing restores the **More** menu.

For maintenance, edit `CSS/ScyFlow-Jellyfin12.css`, then run
`python scripts/build-compat.py` to update the bundled copies.

[Go to installation](#installation)

Also avaliable as a [Userstyle](https://userstyles.world/style/21576/flow-for-jelyfin)

---
<img src="./images/screen.jpg" width="100%"/>

<img src="./images/details.png" width="100%"/>

### **Outline Cards on hover**
<img src="./images/outline_hover.gif" width="100%"/>
<img src="./images/outline.gif" width="100%"/>

### **Backdrop Support**
<img src="./images/backdrop_setting.gif" width="100%"/>

### Base Theme
`@import url('https://cdn.jsdelivr.net/gh/barrelltitor/Flow@jellyfin-12-compatibility/CSS/ScyFlow-main.css');`


### Extras (*smaller cast/crew, etc*) 
`@import url('https://cdn.jsdelivr.net/gh/barrelltitor/Flow@jellyfin-12-compatibility/CSS/ScyFlow-Extras.css');`

 - B/W Logo (credits: [RoyalxZealot](https://www.steamgriddb.com/logo/128502))
 - Smaller Cast/Crew section
 - Hide "Upcoming on TV" and "Next Up" section in Season View

### Options (Add these after/under the base theme)
- Enable Collapsable Drawer/Menu 
    - `@import url('https://cdn.jsdelivr.net/gh/barrelltitor/Flow@jellyfin-12-compatibility/CSS/ScyFlow-Drawer-Toggle.css');`
      <img src="./images/drawer-toggle.gif" width="100%"/>
- Bigger logo (for High DPI/Jellyfn Media Player)
    - `@import url('https://cdn.jsdelivr.net/gh/barrelltitor/Flow@jellyfin-12-compatibility/CSS/ScyFlow-HighDPIExtras.css');`
      <img src="./images/highdpi.png" width="100%"/>
- Episode Grid (from [Ultrachromic](https://github.com/CTalvio/Ultrachromic))
    - `@import url('https://cdn.jsdelivr.net/gh/barrelltitor/Flow@jellyfin-12-compatibility/CSS/ScyFlow-EpisodeGrid.css');`
      <img src="./images/episodegrid_uc.png" width="100%"/>
- Round Cast/Crew/Guests
    - `@import url('https://cdn.jsdelivr.net/gh/barrelltitor/Flow@jellyfin-12-compatibility/CSS/ScyFLow-RoundCastCrew.css');`
      <img src="./images/roundcastcrew.png" width="100%"/>      
- Themes:
    - Orange
        - `@import url('https://cdn.jsdelivr.net/gh/barrelltitor/Flow@jellyfin-12-compatibility/CSS/Themes/ScyFlow-Orange.css');`
        - <img src="./images/orange.png" width="100%"/>
    - Pink
        - `@import url('https://cdn.jsdelivr.net/gh/barrelltitor/Flow@jellyfin-12-compatibility/CSS/Themes/ScyFlow-Pink.css');`
        - <img src="./images/pink.png" width="100%"/>
    - Rainbow
        - `@import url('https://cdn.jsdelivr.net/gh/barrelltitor/Flow@jellyfin-12-compatibility/CSS/Themes/ScyFlow-Rainbow.css');`
        - <img src="./images/rainbow.gif" width="100%"/>
    - Red
        - `@import url('https://cdn.jsdelivr.net/gh/barrelltitor/Flow@jellyfin-12-compatibility/CSS/Themes/ScyFlow-Red.css');`
        - <img src="./images/red.png" width="100%"/>
    - White
        - `@import url('https://cdn.jsdelivr.net/gh/barrelltitor/Flow@jellyfin-12-compatibility/CSS/Themes/ScyFlow-White.css');`
        - <img src="./images/white.png" width="100%"/>
    - Blue
        - `@import url('https://cdn.jsdelivr.net/gh/barrelltitor/Flow@jellyfin-12-compatibility/CSS/Themes/ScyFlow-Blue.css');`
        - <img src="./images/blue.png" width="100%"/>

   - Darker icons/accents (Add this after everything else):
        - `@import url('https://cdn.jsdelivr.net/gh/barrelltitor/Flow@jellyfin-12-compatibility/CSS/Themes/ScyFlow-Dark.css');`
   
  # Compatible with Scyfin/Ultrachromic themes:     
    - Seafoam
        - `@import url('https://cdn.jsdelivr.net/gh/loof2736/scyfin@latest/CSS/theme-seafoam.css');`
    - Coral
        - `@import url('https://cdn.jsdelivr.net/gh/loof2736/scyfin@latest/CSS/theme-coral.css');`
    - Snow
        - `@import url('https://cdn.jsdelivr.net/gh/loof2736/scyfin@latest/CSS/theme-snow.css');`
  # Experimental (Works in progress)
    - Episode Grid Outline/Dim on hover
        - `@import url('https://cdn.jsdelivr.net/gh/barrelltitor/Flow@jellyfin-12-compatibility/CSS/ScyFlow-EpisodeGrid-outline.css');`
        - <img src="./images/episodegrid-outline.gif" width="100%"/>
    - Horizontal-Scroll Episodes
        - `@import url('https://cdn.jsdelivr.net/gh/barrelltitor/Flow@jellyfin-12-compatibility/CSS/ScyFlow-Scrollable-Episodes-WIP.css');`
        - <img src="./images/sidescroll-episodes-wip.gif" width="100%"/>
    - Horizontal-Scroll Episodes (alt, contorls overlayed)
        - `@import url('https://cdn.jsdelivr.net/gh/barrelltitor/Flow@jellyfin-12-compatibility/CSS/ScyFlow-Scrollable-Episodes-ALT.css');`
        - <img src="./images/sidescroll-episodes-alt.gif" width="100%"/>
    - Animated Overlay (on Backdrops and Live TV section)
        - `@import url('https://cdn.jsdelivr.net/gh/barrelltitor/Flow@jellyfin-12-compatibility/CSS/ScyFlow-AnimatedOverlay.css');`
        - <img src="./images/animatedoverlayprev.gif" width="100%"/>
   - Nyan Progress Bar
        - `@import url('https://cdn.jsdelivr.net/gh/barrelltitor/Flow@jellyfin-12-compatibility/CSS/Themes/NyanProgress.css');`
        - <img src="./images/nyanprogress.gif" width="100%"/>
   - Left-Aligned Font/ Poster Spacing / Corner Indicators
        - `@import url('https://cdn.jsdelivr.net/gh/barrelltitor/Flow@jellyfin-12-compatibility/CSS/ScyFlow-FontTweaks.css');`
        - <img src="./images/FontTweaks.png" width="100%"/>

   - # 10.11.x Compatibility (WIP, append after main theme/oneliner)
        - `@import url('https://cdn.jsdelivr.net/gh/barrelltitor/Flow@jellyfin-12-compatibility/CSS/ScyFlow-Compatibility.css');`
        - <img src="./images//10.11-home.jpg" width="100%"/>
        - <img src="./images//10.11-detail-overview.jpg" width="100%"/>
        - <img src="./images//10.11-music-details.jpg" width="100%"/>
        (dashboard theming for 10.11.x only works using UserCSS/external CSS manager)
        - <img src="./images//10.11-dashboard.jpg" width="100%"/>     
---

### **Installation:**

### Easy install (one-liner) 
`@import url('https://cdn.jsdelivr.net/gh/barrelltitor/Flow@jellyfin-12-compatibility/CSS/ScyFlow-oneliner.css');`

***10.11.x Compatibility (WIP, append after main theme/oneliner)***:

`@import url('https://cdn.jsdelivr.net/gh/barrelltitor/Flow@jellyfin-12-compatibility/CSS/ScyFlow-Compatibility.css');`

**(Mobile/Android one-liner)**: `@import url('https://cdn.jsdelivr.net/gh/barrelltitor/Flow@jellyfin-12-compatibility/CSS/ScyFlow-oneliner-mobile.css');`


 <img src="./images/ios.gif" width="60%"/><img src="./images/android.gif"  height="8%"/>
- **Mobile/App fixes:** *if the logo is too big or doesn't apply (iOS, Android), append this line as well (per client)* 
  - `@import url('https://cdn.jsdelivr.net/gh/barrelltitor/Flow@jellyfin-12-compatibility/CSS/ScyFlow-mobilefixes.css');`
- **Smaller Screen/Android fixes:** *if the indicators are too big* 
  - `@import url('https://cdn.jsdelivr.net/gh/barrelltitor/Flow@jellyfin-12-compatibility/CSS/ScyFlow-smallscreen-fixes.css');`


**Server-wide install:**
* Click the hamburger icon (Top left)
* Navigate to "Dashboard" (If you don't see this, make sure you are signed in to your admin account)
* Navigate to "General"
* Near the bottom, under "Custom CSS code", paste the `@import url` for the base theme
    * Example:
    * <img src="./images/install-server-base.png" alt="install-server-base" width="80%"/>
* Optional - Paste the `@import url` for any options / themes you may want
    * Example:
    * <img src="./images/install-server-options.png" alt="install-server-options" width="80%"/>
* Click "Save"

---


**Single client install:**
* Click the hamburger icon (Top left)
* Navigate to "Settings"
* Navigate to "Display"
* Near the middle, under "Custom CSS code", paste the `@import url` for the base theme
    * Note - 
        * If there is any server-wide custom CSS, you may want to enable "Disable server-provided custom CSS code", as the two themes WILL interfere with each other
    * Example:
    * <img src="./images/install-client-base.png" alt="install-client-base" width="80%"/>
* Optional - Paste the `@import url` for any options / themes you may want
    * Example:
    * <img src="./images/install-client-options.png" alt="install-client-options" width="80%"/>
* Click "Save"
