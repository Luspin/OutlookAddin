import*as e from"../../core/common/common.js";import*as t from"../../core/i18n/i18n.js";import*as i from"../../ui/legacy/legacy.js";const o={rendering:"Rendering",showRendering:"Show Rendering",paint:"paint",layout:"layout",fps:"fps",cssMediaType:"CSS media type",cssMediaFeature:"CSS media feature",visionDeficiency:"vision deficiency",colorVisionDeficiency:"color vision deficiency",reloadPage:"Reload page",hardReloadPage:"Hard reload page",forceAdBlocking:"Force ad blocking on this site",blockAds:"Block ads on this site",showAds:"Show ads on this site, if allowed",autoOpenDevTools:"Auto-open DevTools for popups",doNotAutoOpen:"Do not auto-open DevTools for popups",disablePaused:"Disable paused state overlay"},n=t.i18n.registerUIStrings("entrypoints/inspector_main/inspector_main-meta.ts",o),a=t.i18n.getLazilyComputedLocalizedString.bind(void 0,n);let s;async function r(){return s||(s=await import("./inspector_main.js")),s}i.ViewManager.registerViewExtension({location:"drawer-view",id:"rendering",title:a(o.rendering),commandPrompt:a(o.showRendering),persistence:"closeable",order:50,loadView:async()=>(await r()).RenderingOptions.RenderingOptionsView.instance(),tags:[a(o.paint),a(o.layout),a(o.fps),a(o.cssMediaType),a(o.cssMediaFeature),a(o.visionDeficiency),a(o.colorVisionDeficiency)]}),i.ActionRegistration.registerActionExtension({category:i.ActionRegistration.ActionCategory.NAVIGATION,actionId:"inspector_main.reload",loadActionDelegate:async()=>(await r()).InspectorMain.ReloadActionDelegate.instance(),iconClass:"largeicon-refresh",title:a(o.reloadPage),bindings:[{platform:"windows,linux",shortcut:"Ctrl+R"},{platform:"windows,linux",shortcut:"F5"},{platform:"mac",shortcut:"Meta+R"}]}),i.ActionRegistration.registerActionExtension({category:i.ActionRegistration.ActionCategory.NAVIGATION,actionId:"inspector_main.hard-reload",loadActionDelegate:async()=>(await r()).InspectorMain.ReloadActionDelegate.instance(),title:a(o.hardReloadPage),bindings:[{platform:"windows,linux",shortcut:"Shift+Ctrl+R"},{platform:"windows,linux",shortcut:"Shift+F5"},{platform:"windows,linux",shortcut:"Ctrl+F5"},{platform:"windows,linux",shortcut:"Ctrl+Shift+F5"},{platform:"mac",shortcut:"Shift+Meta+R"}]}),e.Settings.registerSettingExtension({category:e.Settings.SettingCategory.NETWORK,title:a(o.forceAdBlocking),settingName:"network.adBlockingEnabled",settingType:e.Settings.SettingType.BOOLEAN,storageType:e.Settings.SettingStorageType.Session,defaultValue:!1,options:[{value:!0,title:a(o.blockAds)},{value:!1,title:a(o.showAds)}]}),e.Settings.registerSettingExtension({category:e.Settings.SettingCategory.GLOBAL,storageType:e.Settings.SettingStorageType.Synced,title:a(o.autoOpenDevTools),settingName:"autoAttachToCreatedPages",settingType:e.Settings.SettingType.BOOLEAN,order:2,defaultValue:!1,options:[{value:!0,title:a(o.autoOpenDevTools)},{value:!1,title:a(o.doNotAutoOpen)}]}),e.Settings.registerSettingExtension({category:e.Settings.SettingCategory.APPEARANCE,storageType:e.Settings.SettingStorageType.Synced,title:a(o.disablePaused),settingName:"disablePausedStateOverlay",settingType:e.Settings.SettingType.BOOLEAN,defaultValue:!1}),i.Toolbar.registerToolbarItem({loadItem:async()=>(await r()).InspectorMain.NodeIndicator.instance(),order:2,location:i.Toolbar.ToolbarItemLocation.MAIN_TOOLBAR_LEFT,showLabel:void 0,condition:void 0,separator:void 0,actionId:void 0});
