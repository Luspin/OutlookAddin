import*as e from"../intl-messageformat/intl-messageformat.js";const t=["af","am","ar","as","az","be","bg","bn","bs","ca","cs","cy","da","de","el","en-GB","en-US","en-XL","es-419","es","et","eu","fa","fi","fil","fr-CA","fr","gl","gu","he","hi","hr","hu","hy","id","is","it","ja","ka","kk","km","kn","ko","ky","lo","lt","lv","mk","ml","mn","mr","ms","my","ne","nl","no","or","pa","pl","pt-PT","pt","ro","ru","si","sk","sl","sq","sr-Latn","sr","sv","sw","ta","te","th","tr","uk","ur","uz","vi","zh","zh-HK","zh-TW","zu"],s={};class r{filename;stringStructure;localizedMessages;localizedStringSet;constructor(e,t,s){this.filename=e,this.stringStructure=t,this.localizedMessages=s}getLocalizedStringSetFor(e){if(this.localizedStringSet)return this.localizedStringSet;const t=this.localizedMessages.get(e);if(!t)throw new Error(`No locale data registered for '${e}'`);return this.localizedStringSet=new a(this.filename,this.stringStructure,e,t),this.localizedStringSet}}class a{filename;stringStructure;localizedMessages;cachedSimpleStrings=new Map;cachedMessageFormatters=new Map;localeForFormatter;constructor(e,t,s,r){this.filename=e,this.stringStructure=t,this.localizedMessages=r,this.localeForFormatter="en-XA"===s||"en-XL"===s?"de-DE":s}getLocalizedString(e,t=s){return t===s||0===Object.keys(t).length?this.getSimpleLocalizedString(e):this.getFormattedLocalizedString(e,t)}getMessageFormatterFor(t){const s=Object.keys(this.stringStructure).find((e=>this.stringStructure[e]===t));if(!s)throw new Error(`Unable to locate '${t}' in UIStrings object`);const r=`${this.filename} | ${s}`,a=this.localizedMessages[r],i=a?a.message:t;return new e.IntlMessageFormat(i,this.localeForFormatter,void 0,{ignoreTag:!0})}getSimpleLocalizedString(e){const t=this.cachedSimpleStrings.get(e);if(t)return t;const s=this.getMessageFormatterFor(e).format();return this.cachedSimpleStrings.set(e,s),s}getFormattedLocalizedString(e,t){let s=this.cachedMessageFormatters.get(e);return s||(s=this.getMessageFormatterFor(e),this.cachedMessageFormatters.set(e,s)),s.format(t)}}var i=Object.freeze({__proto__:null,RegisteredFileStrings:r,LocalizedStringSet:a});var o=Object.freeze({__proto__:null,I18n:class{defaultLocale;supportedLocales;localeData=new Map;constructor(e=t,s="en-US"){this.defaultLocale=s,this.supportedLocales=new Set(e)}registerLocaleData(e,t){this.localeData.set(e,t)}registerFileStrings(e,t){return new r(e,t,this.localeData)}lookupClosestSupportedLocale(e){const t=Intl.getCanonicalLocales(e)[0].split("-");for(;t.length;){const e=t.join("-");if(this.supportedLocales.has(e))return e;t.pop()}return this.defaultLocale}}});export{o as I18n,i as LocalizedStringSet};
