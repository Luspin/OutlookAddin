import*as e from"../helpers/helpers.js";import*as t from"../../lit-html/lit-html.js";const o=new CSSStyleSheet;o.replaceSync(":host{display:block;overflow:auto}.content{background-color:var(--color-background);display:grid;grid-template-columns:min-content 1fr;user-select:text}.report-title{padding:12px 24px;font-size:15px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;border-bottom:1px solid var(--color-details-hairline);color:var(--color-text-primary);background-color:var(--color-background);grid-column-start:span 2}\n/*# sourceURL=report.css */\n");const r=new CSSStyleSheet;r.replaceSync(":host{line-height:28px;margin:0 0 8px}.key{color:var(--color-text-secondary);padding:0 6px;text-align:right;white-space:pre}\n/*# sourceURL=reportKey.css */\n");const s=new CSSStyleSheet;s.replaceSync(":host{grid-column-start:span 2}.section-divider{border-bottom:1px solid var(--color-details-hairline)}\n/*# sourceURL=reportSectionDivider.css */\n");const l=new CSSStyleSheet;l.replaceSync(":host{grid-column-start:span 2}.section-header{padding:12px;margin-left:18px;display:flex;flex-direction:row;align-items:center;flex:auto;text-overflow:ellipsis;overflow:hidden;font-weight:700;color:var(--color-text-primary)}\n/*# sourceURL=reportSectionHeader.css */\n");const i=new CSSStyleSheet;i.replaceSync(":host{line-height:28px;margin:0 0 8px;min-width:150px}.value{color:var(--color-text-primary);margin-inline-start:0;padding:0 6px;overflow-wrap:break-word}\n/*# sourceURL=reportValue.css */\n");class a extends HTMLElement{static litTagName=t.literal`devtools-report`;#e=this.attachShadow({mode:"open"});#t="";set data({reportTitle:e}){this.#t=e,this.render()}connectedCallback(){this.#e.adoptedStyleSheets=[o],this.render()}render(){t.render(t.html` <div class="content"> ${this.#t?t.html`<div class="report-title">${this.#t}</div>`:t.nothing} <slot></slot> </div> `,this.#e,{host:this})}}class n extends HTMLElement{static litTagName=t.literal`devtools-report-section-header`;#e=this.attachShadow({mode:"open"});connectedCallback(){this.#e.adoptedStyleSheets=[l],this.render()}render(){t.render(t.html` <div class="section-header"> <slot></slot> </div> `,this.#e,{host:this})}}class d extends HTMLElement{static litTagName=t.literal`devtools-report-divider`;#e=this.attachShadow({mode:"open"});connectedCallback(){this.#e.adoptedStyleSheets=[s],this.render()}render(){t.render(t.html` <div class="section-divider"> </div> `,this.#e,{host:this})}}class c extends HTMLElement{static litTagName=t.literal`devtools-report-key`;#e=this.attachShadow({mode:"open"});connectedCallback(){this.#e.adoptedStyleSheets=[r],this.render()}render(){t.render(t.html` <div class="key"><slot></slot></div> `,this.#e,{host:this})}}class h extends HTMLElement{static litTagName=t.literal`devtools-report-value`;#e=this.attachShadow({mode:"open"});connectedCallback(){this.#e.adoptedStyleSheets=[i],this.render()}render(){t.render(t.html` <div class="value"><slot></slot></div> `,this.#e,{host:this})}}e.CustomElements.defineComponent("devtools-report",a),e.CustomElements.defineComponent("devtools-report-section-header",n),e.CustomElements.defineComponent("devtools-report-key",c),e.CustomElements.defineComponent("devtools-report-value",h),e.CustomElements.defineComponent("devtools-report-divider",d);var p=Object.freeze({__proto__:null,Report:a,ReportSectionHeader:n,ReportSectionDivider:d,ReportKey:c,ReportValue:h});export{p as ReportView};