import*as t from"../../core/sdk/sdk.js";import*as e from"../../core/i18n/i18n.js";import*as i from"../../core/platform/platform.js";import*as a from"../../models/bindings/bindings.js";import*as s from"../../ui/legacy/legacy.js";import*as n from"../timeline/timeline.js";class o extends t.SDKModel.SDKModel{inputAgent;eventDispatchTimer;dispatchEventDataList;finishCallback;dispatchingIndex;lastEventTime;replayPaused;constructor(t){super(t),this.inputAgent=t.inputAgent(),this.eventDispatchTimer=0,this.dispatchEventDataList=[],this.finishCallback=null,this.reset()}reset(){this.lastEventTime=null,this.replayPaused=!1,this.dispatchingIndex=0,window.clearTimeout(this.eventDispatchTimer)}setEvents(t){this.dispatchEventDataList=[];for(const e of t.sortedProcesses())for(const i of e.sortedThreads())this.processThreadEvents(t,i);this.dispatchEventDataList.sort((function(t,e){return t.timestamp-e.timestamp}))}startReplay(t){this.reset(),this.finishCallback=t,this.dispatchEventDataList.length?this.dispatchNextEvent():this.replayStopped()}pause(){window.clearTimeout(this.eventDispatchTimer),this.dispatchingIndex>=this.dispatchEventDataList.length?this.replayStopped():this.replayPaused=!0}resume(){this.replayPaused=!1,this.dispatchingIndex<this.dispatchEventDataList.length&&this.dispatchNextEvent()}processThreadEvents(t,e){for(const t of e.events())"EventDispatch"===t.name&&this.isValidInputEvent(t.args.data)&&this.dispatchEventDataList.push(t.args.data)}isValidInputEvent(t){return this.isMouseEvent(t)||this.isKeyboardEvent(t)}isMouseEvent(t){return!!l.has(t.type)&&("x"in t&&"y"in t)}isKeyboardEvent(t){return!!r.has(t.type)&&("code"in t&&"key"in t)}dispatchNextEvent(){const t=this.dispatchEventDataList[this.dispatchingIndex];if(this.lastEventTime=t.timestamp,l.has(t.type)?this.dispatchMouseEvent(t):r.has(t.type)&&this.dispatchKeyEvent(t),++this.dispatchingIndex,this.dispatchingIndex<this.dispatchEventDataList.length){const t=(this.dispatchEventDataList[this.dispatchingIndex].timestamp-this.lastEventTime)/1e3;this.eventDispatchTimer=window.setTimeout(this.dispatchNextEvent.bind(this),t)}else this.replayStopped()}async dispatchMouseEvent(t){const e=l.get(t.type);if(!e)throw new Error(`Could not find mouse event type for eventData ${t.type}`);const i=c.get(t.button),a={type:e,x:t.x,y:t.y,modifiers:t.modifiers,button:"mousedown"===t.type||"mouseup"===t.type?i:"none",buttons:t.buttons,clickCount:t.clickCount,deltaX:t.deltaX,deltaY:t.deltaY};await this.inputAgent.invoke_dispatchMouseEvent(a)}async dispatchKeyEvent(t){const e=r.get(t.type);if(!e)throw new Error(`Could not find key event type for eventData ${t.type}`);const i="keypress"===t.type?t.key[0]:void 0,a={type:e,modifiers:t.modifiers,text:i,unmodifiedText:i?i.toLowerCase():void 0,code:t.code,key:t.key};await this.inputAgent.invoke_dispatchKeyEvent(a)}replayStopped(){window.clearTimeout(this.eventDispatchTimer),this.reset(),this.finishCallback&&this.finishCallback()}}const l=new Map([["mousedown","mousePressed"],["mouseup","mouseReleased"],["mousemove","mouseMoved"],["wheel","mouseWheel"]]),r=new Map([["keydown","keyDown"],["keyup","keyUp"],["keypress","char"]]),c=new Map([[0,"left"],[1,"middle"],[2,"right"],[3,"back"],[4,"forward"]]);t.SDKModel.SDKModel.register(o,{capabilities:t.Target.Capability.Input,autostart:!1});var h=Object.freeze({__proto__:null,InputModel:o});const d=new CSSStyleSheet;d.replaceSync(".input-timeline-toolbar-container{display:flex;background-color:var(--color-background-elevation-1);border-bottom:1px solid var(--color-details-hairline);flex:0 0 auto}.input-timeline-toolbar{display:inline-block}\n/*# sourceURL=inputTimeline.css */\n");const p={clearAll:"Clear all",loadProfile:"Load profile…",saveProfile:"Save profile…"},g=e.i18n.registerUIStrings("panels/input//InputTimeline.ts",p),u=e.i18n.getLocalizedString.bind(void 0,g);let m,b;class v extends s.Widget.VBox{tracingClient;tracingModel;inputModel;state;toggleRecordAction;startReplayAction;togglePauseAction;panelToolbar;clearButton;loadButton;saveButton;fileSelectorElement;loader;constructor(){super(!0),this.element.classList.add("inputs-timeline"),this.tracingClient=null,this.tracingModel=null,this.inputModel=null,this.state="Idle",this.toggleRecordAction=s.ActionRegistry.ActionRegistry.instance().action("input.toggle-recording"),this.startReplayAction=s.ActionRegistry.ActionRegistry.instance().action("input.start-replaying"),this.togglePauseAction=s.ActionRegistry.ActionRegistry.instance().action("input.toggle-pause");const t=this.contentElement.createChild("div","input-timeline-toolbar-container");this.panelToolbar=new s.Toolbar.Toolbar("input-timeline-toolbar",t),this.panelToolbar.appendToolbarItem(s.Toolbar.Toolbar.createActionButton(this.toggleRecordAction)),this.panelToolbar.appendToolbarItem(s.Toolbar.Toolbar.createActionButton(this.startReplayAction)),this.panelToolbar.appendToolbarItem(s.Toolbar.Toolbar.createActionButton(this.togglePauseAction)),this.clearButton=new s.Toolbar.ToolbarButton(u(p.clearAll),"largeicon-clear"),this.clearButton.addEventListener(s.Toolbar.ToolbarButton.Events.Click,this.reset.bind(this)),this.panelToolbar.appendToolbarItem(this.clearButton),this.panelToolbar.appendSeparator(),this.loadButton=new s.Toolbar.ToolbarButton(u(p.loadProfile),"largeicon-load"),this.loadButton.addEventListener(s.Toolbar.ToolbarButton.Events.Click,(()=>this.selectFileToLoad())),this.saveButton=new s.Toolbar.ToolbarButton(u(p.saveProfile),"largeicon-download"),this.saveButton.addEventListener(s.Toolbar.ToolbarButton.Events.Click,(t=>{this.saveToFile()})),this.panelToolbar.appendSeparator(),this.panelToolbar.appendToolbarItem(this.loadButton),this.panelToolbar.appendToolbarItem(this.saveButton),this.panelToolbar.appendSeparator(),this.createFileSelector(),this.updateControls()}static instance(t={forceNew:!1}){const{forceNew:e}=t;return m&&!e||(m=new v),m}reset(){this.tracingClient=null,this.tracingModel=null,this.inputModel=null,this.setState("Idle")}createFileSelector(){this.fileSelectorElement&&this.fileSelectorElement.remove(),this.fileSelectorElement=s.UIUtils.createFileSelectorElement(this.loadFromFile.bind(this)),this.element.appendChild(this.fileSelectorElement)}wasShown(){super.wasShown(),this.registerCSSFiles([d])}willHide(){}setState(t){this.state=t,this.updateControls()}isAvailableState(){return"Idle"===this.state||"ReplayPaused"===this.state}updateControls(){this.toggleRecordAction.setToggled("Recording"===this.state),this.toggleRecordAction.setEnabled(this.isAvailableState()||"Recording"===this.state),this.startReplayAction.setEnabled(this.isAvailableState()&&Boolean(this.tracingModel)),this.togglePauseAction.setEnabled("Replaying"===this.state||"ReplayPaused"===this.state),this.togglePauseAction.setToggled("ReplayPaused"===this.state),this.clearButton.setEnabled(this.isAvailableState()),this.loadButton.setEnabled(this.isAvailableState()),this.saveButton.setEnabled(this.isAvailableState()&&Boolean(this.tracingModel))}toggleRecording(){switch(this.state){case"Recording":this.stopRecording();break;case"Idle":this.startRecording()}}startReplay(){this.replayEvents()}toggleReplayPause(){switch(this.state){case"Replaying":this.pauseReplay();break;case"ReplayPaused":this.resumeReplay()}}async saveToFile(){if(console.assert("Idle"===this.state),!this.tracingModel)return;const t=`InputProfile-${i.DateUtilities.toISO8601Compact(new Date)}.json`,e=new a.FileUtils.FileOutputStream;if(!await e.open(t))return;const s=this.tracingModel.backingStorage();await s.writeToStream(e),e.close()}selectFileToLoad(){this.fileSelectorElement&&this.fileSelectorElement.click()}loadFromFile(t){console.assert(this.isAvailableState()),this.setState("Loading"),this.loader=n.TimelineLoader.TimelineLoader.loadFromFile(t,this),this.createFileSelector()}async startRecording(){this.setState("StartPending"),this.tracingClient=new T(t.TargetManager.TargetManager.instance().mainTarget(),this);const e=await this.tracingClient.startRecording();!e||e.getError()?this.recordingFailed():this.setState("Recording")}async stopRecording(){this.tracingClient&&(this.setState("StopPending"),await this.tracingClient.stopRecording(),this.tracingClient=null)}async replayEvents(){this.inputModel&&(this.setState("Replaying"),await this.inputModel.startReplay(this.replayStopped.bind(this)))}pauseReplay(){this.inputModel&&(this.inputModel.pause(),this.setState("ReplayPaused"))}resumeReplay(){this.inputModel&&(this.inputModel.resume(),this.setState("Replaying"))}loadingStarted(){}loadingProgress(t){}processingStarted(){}loadingComplete(e){e?(this.inputModel=new o(t.TargetManager.TargetManager.instance().mainTarget()),this.tracingModel=e,this.inputModel.setEvents(e),this.setState("Idle")):this.reset()}recordingFailed(){this.tracingClient=null,this.setState("Idle")}replayStopped(){this.setState("Idle")}}class y{static instance(t={forceNew:null}){const{forceNew:e}=t;return b&&!e||(b=new y),b}handleAction(t,e){const i="Inputs";return s.ViewManager.ViewManager.instance().showView(i).then((()=>s.ViewManager.ViewManager.instance().view(i).widget())).then((t=>this.innerHandleAction(t,e))),!0}innerHandleAction(t,e){switch(e){case"input.toggle-recording":t.toggleRecording();break;case"input.start-replaying":t.startReplay();break;case"input.toggle-pause":t.toggleReplayPause();break;default:console.assert(!1,`Unknown action: ${e}`)}}}class T{target;tracingManager;client;tracingModel;tracingCompleteCallback;constructor(e,i){this.target=e,this.tracingManager=e.model(t.TracingManager.TracingManager),this.client=i;const s=new a.TempFile.TempFileBackingStorage;this.tracingModel=new t.TracingModel.TracingModel(s),this.tracingCompleteCallback=null}async startRecording(){if(!this.tracingManager)return;const t=["devtools.timeline","disabled-by-default-devtools.timeline.inputs"].join(","),e=await this.tracingManager.start(this,t,"");return e.getError()&&await this.waitForTracingToStop(!1),e}async stopRecording(){this.tracingManager&&this.tracingManager.stop(),await this.waitForTracingToStop(!0),await t.TargetManager.TargetManager.instance().resumeAllTargets(),this.tracingModel.tracingComplete(),this.client.loadingComplete(this.tracingModel)}traceEventsCollected(t){this.tracingModel.addEvents(t)}tracingComplete(){this.tracingCompleteCallback&&this.tracingCompleteCallback(),this.tracingCompleteCallback=null}tracingBufferUsage(t){}eventsRetrievalProgress(t){}waitForTracingToStop(t){return new Promise((e=>{this.tracingManager&&t?this.tracingCompleteCallback=e:e()}))}}var w=Object.freeze({__proto__:null,InputTimeline:v,ActionDelegate:y,TracingClient:T});export{h as InputModel,w as InputTimeline};