import*as t from"../../core/i18n/i18n.js";import*as e from"../../core/sdk/sdk.js";import*as n from"../../core/common/common.js";import*as i from"../../core/host/host.js";import*as o from"../../ui/legacy/legacy.js";const r={noThrottling:"No throttling",noInternetConnectivity:"No internet connectivity",lowendMobile:"Low-end mobile",slowGXCpuSlowdown:"Slow 3G & 6x CPU slowdown",midtierMobile:"Mid-tier mobile",fastGXCpuSlowdown:"Fast 3G & 4x CPU slowdown",custom:"Custom",checkNetworkAndPerformancePanels:"Check Network and Performance panels"},s=t.i18n.registerUIStrings("panels/mobile_throttling/ThrottlingPresets.ts",r),l=t.i18n.getLocalizedString.bind(void 0,s);class a{static getNoThrottlingConditions(){return{title:"function"==typeof e.NetworkManager.NoThrottlingConditions.title?e.NetworkManager.NoThrottlingConditions.title():e.NetworkManager.NoThrottlingConditions.title,description:l(r.noThrottling),network:e.NetworkManager.NoThrottlingConditions,cpuThrottlingRate:e.CPUThrottlingManager.CPUThrottlingRates.NoThrottling}}static getOfflineConditions(){return{title:"function"==typeof e.NetworkManager.OfflineConditions.title?e.NetworkManager.OfflineConditions.title():e.NetworkManager.OfflineConditions.title,description:l(r.noInternetConnectivity),network:e.NetworkManager.OfflineConditions,cpuThrottlingRate:e.CPUThrottlingManager.CPUThrottlingRates.NoThrottling}}static getLowEndMobileConditions(){return{title:l(r.lowendMobile),description:l(r.slowGXCpuSlowdown),network:e.NetworkManager.Slow3GConditions,cpuThrottlingRate:e.CPUThrottlingManager.CPUThrottlingRates.LowEndMobile}}static getMidTierMobileConditions(){return{title:l(r.midtierMobile),description:l(r.fastGXCpuSlowdown),network:e.NetworkManager.Fast3GConditions,cpuThrottlingRate:e.CPUThrottlingManager.CPUThrottlingRates.MidTierMobile}}static getCustomConditions(){return{title:l(r.custom),description:l(r.checkNetworkAndPerformancePanels)}}static getMobilePresets(){return[a.getMidTierMobileConditions(),a.getLowEndMobileConditions(),a.getCustomConditions()]}static getAdvancedMobilePresets(){return[a.getOfflineConditions()]}static networkPresets=[e.NetworkManager.Fast3GConditions,e.NetworkManager.Slow3GConditions,e.NetworkManager.OfflineConditions];static cpuThrottlingPresets=[e.CPUThrottlingManager.CPUThrottlingRates.NoThrottling,e.CPUThrottlingManager.CPUThrottlingRates.MidTierMobile,e.CPUThrottlingManager.CPUThrottlingRates.LowEndMobile]}globalThis.MobileThrottling=globalThis.MobileThrottling||{},globalThis.MobileThrottling.networkPresets=a.networkPresets;var d=Object.freeze({__proto__:null,ThrottlingPresets:a});const c={disabled:"Disabled",presets:"Presets",custom:"Custom"},g=t.i18n.registerUIStrings("panels/mobile_throttling/NetworkThrottlingSelector.ts",c),h=t.i18n.getLocalizedString.bind(void 0,g);class u{populateCallback;selectCallback;customNetworkConditionsSetting;options;constructor(t,n,i){this.populateCallback=t,this.selectCallback=n,this.customNetworkConditionsSetting=i,this.customNetworkConditionsSetting.addChangeListener(this.populateOptions,this),e.NetworkManager.MultitargetNetworkManager.instance().addEventListener(e.NetworkManager.MultitargetNetworkManager.Events.ConditionsChanged,(()=>{this.networkConditionsChanged()}),this),this.populateOptions()}revealAndUpdate(){n.Revealer.reveal(this.customNetworkConditionsSetting),this.networkConditionsChanged()}optionSelected(t){e.NetworkManager.MultitargetNetworkManager.instance().setNetworkConditions(t)}populateOptions(){const t={title:h(c.disabled),items:[e.NetworkManager.NoThrottlingConditions]},n={title:h(c.presets),items:a.networkPresets},i={title:h(c.custom),items:this.customNetworkConditionsSetting.get()};if(this.options=this.populateCallback([t,n,i]),!this.networkConditionsChanged())for(let t=this.options.length-1;t>=0;t--)if(this.options[t]){this.optionSelected(this.options[t]);break}}networkConditionsChanged(){const t=e.NetworkManager.MultitargetNetworkManager.instance().networkConditions();for(let n=0;n<this.options.length;++n){const i=this.options[n];if(i&&e.NetworkManager.networkConditionsEqual(t,i))return this.selectCallback(n),!0}return!1}}var p=Object.freeze({__proto__:null,NetworkThrottlingSelector:u});const w={sS:"{PH1}: {PH2}",add:"Add…",addS:"Add {PH1}",offline:"Offline",forceDisconnectedFromNetwork:"Force disconnected from network",throttling:"Throttling",cpuThrottlingIsEnabled:"CPU throttling is enabled",cpuThrottling:"CPU throttling",noThrottling:"No throttling",dSlowdown:"{PH1}× slowdown"},C=t.i18n.registerUIStrings("panels/mobile_throttling/ThrottlingManager.ts",w),k=t.i18n.getLocalizedString.bind(void 0,C);let M,N;class m{cpuThrottlingControls;cpuThrottlingRates;customNetworkConditionsSetting;currentNetworkThrottlingConditionsSetting;lastNetworkThrottlingConditions;cpuThrottlingManager;constructor(){this.cpuThrottlingManager=e.CPUThrottlingManager.CPUThrottlingManager.instance(),this.cpuThrottlingControls=new Set,this.cpuThrottlingRates=a.cpuThrottlingPresets,this.customNetworkConditionsSetting=n.Settings.Settings.instance().moduleSetting("customNetworkConditions"),this.currentNetworkThrottlingConditionsSetting=n.Settings.Settings.instance().createSetting("preferredNetworkCondition",e.NetworkManager.NoThrottlingConditions),this.currentNetworkThrottlingConditionsSetting.setSerializer(new e.NetworkManager.ConditionsSerializer),e.NetworkManager.MultitargetNetworkManager.instance().addEventListener(e.NetworkManager.MultitargetNetworkManager.Events.ConditionsChanged,(()=>{this.lastNetworkThrottlingConditions=this.currentNetworkThrottlingConditionsSetting.get(),this.currentNetworkThrottlingConditionsSetting.set(e.NetworkManager.MultitargetNetworkManager.instance().networkConditions())})),this.isDirty()&&e.NetworkManager.MultitargetNetworkManager.instance().setNetworkConditions(this.currentNetworkThrottlingConditionsSetting.get())}static instance(t={forceNew:null}){const{forceNew:e}=t;return M&&!e||(M=new m),M}decorateSelectWithNetworkThrottling(t){let e=[];const n=new u((function(n){t.removeChildren(),e=[];for(let i=0;i<n.length;++i){const r=n[i],s=t.createChild("optgroup");s.label=r.title;for(const t of r.items){const n="function"==typeof t.title?t.title():t.title,i=new Option(n,n);o.ARIAUtils.setAccessibleName(i,k(w.sS,{PH1:r.title,PH2:n})),s.appendChild(i),e.push(t)}if(i===n.length-1){const t=new Option(k(w.add),k(w.add));o.ARIAUtils.setAccessibleName(t,k(w.addS,{PH1:r.title})),s.appendChild(t),e.push(null)}}return e}),(function(e){t.selectedIndex!==e&&(t.selectedIndex=e)}),this.customNetworkConditionsSetting);return t.addEventListener("change",(function(){if(t.selectedIndex===t.options.length-1)n.revealAndUpdate();else{const i=e[t.selectedIndex];i&&n.optionSelected(i)}}),!1),n}createOfflineToolbarCheckbox(){const t=new o.Toolbar.ToolbarCheckbox(k(w.offline),k(w.forceDisconnectedFromNetwork),function(){t.checked()?e.NetworkManager.MultitargetNetworkManager.instance().setNetworkConditions(e.NetworkManager.OfflineConditions):e.NetworkManager.MultitargetNetworkManager.instance().setNetworkConditions(this.lastNetworkThrottlingConditions)}.bind(this));return e.NetworkManager.MultitargetNetworkManager.instance().addEventListener(e.NetworkManager.MultitargetNetworkManager.Events.ConditionsChanged,(function(){t.setChecked(e.NetworkManager.MultitargetNetworkManager.instance().networkConditions()===e.NetworkManager.OfflineConditions)})),t.setChecked(e.NetworkManager.MultitargetNetworkManager.instance().networkConditions()===e.NetworkManager.OfflineConditions),t}createMobileThrottlingButton(){const t=new o.Toolbar.ToolbarMenuButton((function(t){for(let o=0;o<e.length;++o){const r=e[o];r&&(r.title===a.getCustomConditions().title&&r.description===a.getCustomConditions().description||t.defaultSection().appendCheckboxItem(r.title,i.optionSelected.bind(i,r),n===o))}}));t.setTitle(k(w.throttling)),t.setGlyph(""),t.turnIntoSelect(),t.setDarkText();let e=[],n=-1;const i=new P((function(t){e=[];for(const n of t){for(const t of n.items)e.push(t);e.push(null)}return e}),(function(i){n=i;const o=e[i];o&&(t.setText(o.title),t.setTitle(o.description))}));return t}setCPUThrottlingRate(t){this.cpuThrottlingManager.setCPUThrottlingRate(t);let n=null;t!==e.CPUThrottlingManager.CPUThrottlingRates.NoThrottling&&(i.userMetrics.actionTaken(i.UserMetrics.Action.CpuThrottlingEnabled),n=o.Icon.Icon.create("smallicon-warning"),o.Tooltip.Tooltip.install(n,k(w.cpuThrottlingIsEnabled)));const r=this.cpuThrottlingRates.indexOf(t);for(const t of this.cpuThrottlingControls)t.setSelectedIndex(r);o.InspectorView.InspectorView.instance().setPanelIcon("timeline",n)}createCPUThrottlingSelector(){const t=new o.Toolbar.ToolbarComboBox((t=>this.setCPUThrottlingRate(this.cpuThrottlingRates[t.target.selectedIndex])),k(w.cpuThrottling));this.cpuThrottlingControls.add(t);const e=this.cpuThrottlingManager.cpuThrottlingRate();for(let n=0;n<this.cpuThrottlingRates.length;++n){const i=this.cpuThrottlingRates[n],o=1===i?k(w.noThrottling):k(w.dSlowdown,{PH1:i}),r=t.createOption(o);t.addOption(r),e===i&&t.setSelectedIndex(n)}return t}isDirty(){const t=e.NetworkManager.MultitargetNetworkManager.instance().networkConditions(),n=this.currentNetworkThrottlingConditionsSetting.get();return!e.NetworkManager.networkConditionsEqual(t,n)}}class b{static instance(t={forceNew:null}){const{forceNew:e}=t;return N&&!e||(N=new b),N}handleAction(t,n){return"network-conditions.network-online"===n?(e.NetworkManager.MultitargetNetworkManager.instance().setNetworkConditions(e.NetworkManager.NoThrottlingConditions),!0):"network-conditions.network-low-end-mobile"===n?(e.NetworkManager.MultitargetNetworkManager.instance().setNetworkConditions(e.NetworkManager.Slow3GConditions),!0):"network-conditions.network-mid-tier-mobile"===n?(e.NetworkManager.MultitargetNetworkManager.instance().setNetworkConditions(e.NetworkManager.Fast3GConditions),!0):"network-conditions.network-offline"===n&&(e.NetworkManager.MultitargetNetworkManager.instance().setNetworkConditions(e.NetworkManager.OfflineConditions),!0)}}function f(){return m.instance()}var T=Object.freeze({__proto__:null,ThrottlingManager:m,ActionDelegate:b,throttlingManager:f});const v={disabled:"Disabled",presets:"Presets",advanced:"Advanced"},S=t.i18n.registerUIStrings("panels/mobile_throttling/MobileThrottlingSelector.ts",v),x=t.i18n.getLocalizedString.bind(void 0,S);class P{populateCallback;selectCallback;options;constructor(t,n){this.populateCallback=t,this.selectCallback=n,e.CPUThrottlingManager.CPUThrottlingManager.instance().addEventListener(e.CPUThrottlingManager.Events.RateChanged,this.conditionsChanged,this),e.NetworkManager.MultitargetNetworkManager.instance().addEventListener(e.NetworkManager.MultitargetNetworkManager.Events.ConditionsChanged,this.conditionsChanged,this),this.options=this.populateOptions(),this.conditionsChanged()}optionSelected(t){e.NetworkManager.MultitargetNetworkManager.instance().setNetworkConditions(t.network),f().setCPUThrottlingRate(t.cpuThrottlingRate)}populateOptions(){const t={title:x(v.disabled),items:[a.getNoThrottlingConditions()]},e={title:x(v.presets),items:a.getMobilePresets()},n={title:x(v.advanced),items:a.getAdvancedMobilePresets()};return this.populateCallback([t,e,n])}conditionsChanged(){const t=e.NetworkManager.MultitargetNetworkManager.instance().networkConditions(),n=e.CPUThrottlingManager.CPUThrottlingManager.instance().cpuThrottlingRate();for(let e=0;e<this.options.length;++e){const i=this.options[e];if(i&&"network"in i&&i.network===t&&i.cpuThrottlingRate===n)return void this.selectCallback(e)}const i=a.getCustomConditions();for(let t=0;t<this.options.length;++t){const e=this.options[t];if(e&&e.title===i.title&&e.description===i.description)return void this.selectCallback(t)}}}var I=Object.freeze({__proto__:null,MobileThrottlingSelector:P});const U={networkThrottlingIsEnabled:"Network throttling is enabled",requestsMayBeRewrittenByLocal:"Requests may be rewritten by local overrides",requestsMayBeBlocked:"Requests may be blocked",acceptedEncodingOverrideSet:"The set of accepted `Content-Encoding` headers has been modified by DevTools. See the Network Conditions panel."},A=t.i18n.registerUIStrings("panels/mobile_throttling/NetworkPanelIndicator.ts",U),E=t.i18n.getLocalizedString.bind(void 0,A);var R=Object.freeze({__proto__:null,NetworkPanelIndicator:class{constructor(){if(!o.InspectorView.InspectorView.instance().hasPanel("network"))return;const t=e.NetworkManager.MultitargetNetworkManager.instance();function n(){let n=null;t.isThrottling()?(n=o.Icon.Icon.create("smallicon-warning"),o.Tooltip.Tooltip.install(n,E(U.networkThrottlingIsEnabled))):e.NetworkManager.MultitargetNetworkManager.instance().isIntercepting()?(n=o.Icon.Icon.create("smallicon-warning"),o.Tooltip.Tooltip.install(n,E(U.requestsMayBeRewrittenByLocal))):t.isBlocking()?(n=o.Icon.Icon.create("smallicon-warning"),o.Tooltip.Tooltip.install(n,E(U.requestsMayBeBlocked))):t.isAcceptedEncodingOverrideSet()&&(n=o.Icon.Icon.create("smallicon-warning"),o.Tooltip.Tooltip.install(n,E(U.acceptedEncodingOverrideSet))),o.InspectorView.InspectorView.instance().setPanelIcon("network",n)}t.addEventListener(e.NetworkManager.MultitargetNetworkManager.Events.ConditionsChanged,n),t.addEventListener(e.NetworkManager.MultitargetNetworkManager.Events.BlockedPatternsChanged,n),t.addEventListener(e.NetworkManager.MultitargetNetworkManager.Events.InterceptorsChanged,n),t.addEventListener(e.NetworkManager.MultitargetNetworkManager.Events.AcceptedEncodingsChanged,n),n()}}});const y=new CSSStyleSheet;y.replaceSync(":host{overflow:hidden}.header{padding:0 0 6px;border-bottom:1px solid var(--color-details-hairline);font-size:18px;font-weight:400;flex:none}.add-conditions-button{flex:none;margin:10px 2px;min-width:140px;align-self:flex-start}.conditions-list{max-width:500px;min-width:340px;flex:auto}.conditions-list-item{padding:3px 5px;height:30px;display:flex;align-items:center;position:relative;flex:auto 1 1}.conditions-list-text{white-space:nowrap;text-overflow:ellipsis;flex:0 0 70px;user-select:none;color:var(--color-text-primary);text-align:end;position:relative}.conditions-list-text:last-child{flex-basis:140px;text-align:left}.conditions-edit-row .conditions-list-text:last-child{text-align:right}.conditions-list-title{text-align:start;display:flex;flex:auto;align-items:flex-start}.conditions-list-title-text{overflow:hidden;flex:auto;white-space:nowrap;text-overflow:ellipsis}.conditions-list-separator{flex:0 0 1px;background-color:var(--color-background-elevation-2);height:30px;margin:0 4px}.conditions-list-separator-invisible{visibility:hidden;height:100%!important}.conditions-edit-row{flex:none;display:flex;flex-direction:row;margin:6px 5px}.conditions-edit-row input{width:100%;text-align:inherit}.conditions-edit-optional{position:absolute;bottom:-20px;right:0;color:var(--color-text-disabled)}.editor-buttons{margin-top:10px}\n/*# sourceURL=throttlingSettingsTab.css */\n");const L={networkThrottlingProfiles:"Network Throttling Profiles",addCustomProfile:"Add custom profile...",dms:"{PH1} `ms`",profileName:"Profile Name",download:"Download",upload:"Upload",latency:"Latency",optional:"optional",profileNameCharactersLengthMust:"Profile Name characters length must be between 1 to {PH1} inclusive",sMustBeANumberBetweenSkbsToSkbs:"{PH1} must be a number between {PH2} `kbit/s` to {PH3} `kbit/s` inclusive",latencyMustBeAnIntegerBetweenSms:"Latency must be an integer between {PH1} `ms` to {PH2} `ms` inclusive",dskbits:"{PH1} `kbit/s`",fsmbits:"{PH1} `Mbit/s`"},O=t.i18n.registerUIStrings("panels/mobile_throttling/ThrottlingSettingsTab.ts",L),_=t.i18n.getLocalizedString.bind(void 0,O);let H;class B extends o.Widget.VBox{list;customSetting;editor;constructor(){super(!0);const t=this.contentElement.createChild("div","header");t.textContent=_(L.networkThrottlingProfiles),o.ARIAUtils.markAsHeading(t,1);const e=o.UIUtils.createTextButton(_(L.addCustomProfile),this.addButtonClicked.bind(this),"add-conditions-button");this.contentElement.appendChild(e),this.list=new o.ListWidget.ListWidget(this),this.list.element.classList.add("conditions-list"),this.list.show(this.contentElement),this.customSetting=n.Settings.Settings.instance().moduleSetting("customNetworkConditions"),this.customSetting.addChangeListener(this.conditionsUpdated,this),this.setDefaultFocusedElement(e)}static instance(t={forceNew:null}){const{forceNew:e}=t;return H&&!e||(H=new B),H}wasShown(){super.wasShown(),this.list.registerCSSFiles([y]),this.registerCSSFiles([y]),this.conditionsUpdated()}conditionsUpdated(){this.list.clear();const t=this.customSetting.get();for(let e=0;e<t.length;++e)this.list.appendItem(t[e],!0);this.list.appendSeparator()}addButtonClicked(){this.list.addNewItem(this.customSetting.get().length,{title:()=>"",download:-1,upload:-1,latency:0})}renderItem(t,e){const n=document.createElement("div");n.classList.add("conditions-list-item");const i=n.createChild("div","conditions-list-text conditions-list-title").createChild("div","conditions-list-title-text"),r=this.retrieveOptionsTitle(t);return i.textContent=r,o.Tooltip.Tooltip.install(i,r),n.createChild("div","conditions-list-separator"),n.createChild("div","conditions-list-text").textContent=z(t.download),n.createChild("div","conditions-list-separator"),n.createChild("div","conditions-list-text").textContent=z(t.upload),n.createChild("div","conditions-list-separator"),n.createChild("div","conditions-list-text").textContent=_(L.dms,{PH1:t.latency}),n}removeItemRequested(t,e){const n=this.customSetting.get();n.splice(e,1),this.customSetting.set(n)}retrieveOptionsTitle(t){return"function"==typeof t.title?t.title():t.title}commitEdit(t,e,n){t.title=e.control("title").value.trim();const i=e.control("download").value.trim();t.download=i?125*parseInt(i,10):-1;const o=e.control("upload").value.trim();t.upload=o?125*parseInt(o,10):-1;const r=e.control("latency").value.trim();t.latency=r?parseInt(r,10):0;const s=this.customSetting.get();n&&s.push(t),this.customSetting.set(s)}beginEdit(t){const e=this.createEditor();return e.control("title").value=this.retrieveOptionsTitle(t),e.control("download").value=t.download<=0?"":String(t.download/125),e.control("upload").value=t.upload<=0?"":String(t.upload/125),e.control("latency").value=t.latency?String(t.latency):"",e}createEditor(){if(this.editor)return this.editor;const e=new o.ListWidget.Editor;this.editor=e;const n=e.contentElement(),i=n.createChild("div","conditions-edit-row"),r=i.createChild("div","conditions-list-text conditions-list-title"),s=_(L.profileName);r.createChild("div","conditions-list-title-text").textContent=s,i.createChild("div","conditions-list-separator conditions-list-separator-invisible");const l=i.createChild("div","conditions-list-text"),a=_(L.download);l.createChild("div","conditions-list-title-text").textContent=a,i.createChild("div","conditions-list-separator conditions-list-separator-invisible");const d=i.createChild("div","conditions-list-text").createChild("div","conditions-list-title-text"),c=_(L.upload);d.textContent=c,i.createChild("div","conditions-list-separator conditions-list-separator-invisible");const g=i.createChild("div","conditions-list-text"),h=_(L.latency);g.createChild("div","conditions-list-title-text").textContent=h;const u=n.createChild("div","conditions-edit-row"),p=e.createInput("title","text","",(function(t,e,n){const i=n.value.trim(),o=i.length>0&&i.length<=49;if(!o){const t=_(L.profileNameCharactersLengthMust,{PH1:49});return{valid:o,errorMessage:t}}return{valid:o,errorMessage:void 0}}));o.ARIAUtils.setAccessibleName(p,s),u.createChild("div","conditions-list-text conditions-list-title").appendChild(p),u.createChild("div","conditions-list-separator conditions-list-separator-invisible");let w=u.createChild("div","conditions-list-text");const C=e.createInput("download","text",t.i18n.lockedString("kbit/s"),b);w.appendChild(C),o.ARIAUtils.setAccessibleName(C,a);const k=w.createChild("div","conditions-edit-optional"),M=_(L.optional);k.textContent=M,o.ARIAUtils.setDescription(C,M),u.createChild("div","conditions-list-separator conditions-list-separator-invisible"),w=u.createChild("div","conditions-list-text");const N=e.createInput("upload","text",t.i18n.lockedString("kbit/s"),b);o.ARIAUtils.setAccessibleName(N,c),w.appendChild(N);w.createChild("div","conditions-edit-optional").textContent=M,o.ARIAUtils.setDescription(N,M),u.createChild("div","conditions-list-separator conditions-list-separator-invisible"),w=u.createChild("div","conditions-list-text");const m=e.createInput("latency","text",t.i18n.lockedString("ms"),(function(t,e,n){const i=1e6,o=n.value.trim(),r=Number(o),s=Number.isInteger(r)&&r>=0&&r<=i;if(!s){const t=_(L.latencyMustBeAnIntegerBetweenSms,{PH1:0,PH2:i});return{valid:s,errorMessage:t}}return{valid:s,errorMessage:void 0}}));o.ARIAUtils.setAccessibleName(m,h),w.appendChild(m);return w.createChild("div","conditions-edit-optional").textContent=M,o.ARIAUtils.setDescription(m,M),e;function b(t,e,n){const i=1e7,o=n.value.trim(),r=Number(o),s=n.getAttribute("aria-label"),l=!Number.isNaN(r)&&r>=0&&r<=i;if(!l){return{valid:l,errorMessage:_(L.sMustBeANumberBetweenSkbsToSkbs,{PH1:String(s),PH2:0,PH3:i})}}return{valid:l,errorMessage:void 0}}}}function z(t){if(t<0)return"";const e=t/125;if(e<1e3)return _(L.dskbits,{PH1:e});if(e<1e4){const t=(e/1e3).toFixed(1);return _(L.fsmbits,{PH1:t})}return _(L.fsmbits,{PH1:e/1e3|0})}var D=Object.freeze({__proto__:null,ThrottlingSettingsTab:B});export{I as MobileThrottlingSelector,R as NetworkPanelIndicator,p as NetworkThrottlingSelector,T as ThrottlingManager,d as ThrottlingPresets,D as ThrottlingSettingsTab};