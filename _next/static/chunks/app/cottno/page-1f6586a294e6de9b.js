(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[50],{2802:function(e,t,i){Promise.resolve().then(i.bind(i,4245))},4245:function(e,t,i){"use strict";i.r(t),i.d(t,{default:function(){return O}});var s=i(6683),n=i(3904);class r{add(e){return this.x+=e.x,this.y+=e.y,this}sub(e){return this.x=this.x-e.x,this.y=this.y-e.y,this}divideScalar(e){return this.x=this.x/e,this.y=this.y/e,this}multiplyScalar(e){return this.x=this.x*e,this.y=this.y*e,this}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}length(){return this._getHypotenuse(this.x,this.y)}clone(){return new r(this.x,this.y)}distanceTo(e){return this._getHypotenuse(this.x-e.x,this.y-e.y)}_getHypotenuse(e,t){return Math.pow(Math.pow(e,2)+Math.pow(t,2),.5)}constructor(e=0,t=0){this.x=e,this.y=t}}class a{registerListeners(){this.map.container.addEventListener("pointerdown",this.pointerDownRef),this.map.container.addEventListener("pointerup",this.pointerUpRef),this.map.container.addEventListener("pointerout",this.pointerOutRef),this.map.container.addEventListener("pointermove",this.pointerMoveRef),this.map.container.addEventListener("wheel",this.wheelRef,!0),this.map.container.addEventListener("contextmenu",this.contextMenuRef)}deregisterListeners(){this.map.container.removeEventListener("pointerdown",this.pointerDownRef),this.map.container.removeEventListener("pointerup",this.pointerUpRef),this.map.container.removeEventListener("pointerout",this.pointerOutRef),this.map.container.removeEventListener("pointermove",this.pointerMoveRef),this.map.container.removeEventListener("wheel",this.wheelRef,!0),this.map.container.removeEventListener("contextmenu",this.contextMenuRef)}handlePointerDown(e){this.momentumVelocityPxPerS=new r,this.currentEvents.find(t=>t.pointerId===e.pointerId)||this.currentEvents.push(e)}handlePointerUp(e){let t=this.currentEvents.findIndex(t=>t.pointerId===e.pointerId);this.currentEvents.splice(t,1),0===this.currentEvents.length&&this.handleMoveMomentum(e)}handleWheel(e){e.preventDefault();let t=e.deltaY<0?.1:-.1,i=new r(this.getLocalX(e),this.getLocalY(e));this.map.zoom(t,i)}handlePointerMove(e){let t=this.currentEvents.findIndex(t=>t.pointerId===e.pointerId);if(-1===t)return;let i=this.currentEvents[t];if(1===this.currentEvents.length){let t=new r(e.clientX-i.clientX,e.clientY-i.clientY);this.handleMove(t,e.timeStamp)}else this.handleGesture(e,e.timeStamp);this.currentEvents[t]=e}handleMove(e,t){this.moveEventCache.push({moveVector:e,timeStamp:t}),this.moveEventCache.length>40&&this.moveEventCache.shift(),this.map.panPx(e)}handleMoveMomentum(e){let t="mouse"===e.pointerType?40:100,i=this.moveEventCache.filter(i=>e.timeStamp-i.timeStamp<t);if(this.moveEventCache=[],i.length<5)return;let s=i.map(e=>e.moveVector).reduce((e,t)=>t.add(e)),n=i.map(e=>e.timeStamp),r=s.divideScalar((Math.max(...n)-Math.min(...n))/1e3);r.length()>100&&(this.momentumVelocityPxPerS=r,this.momentumBurnOff())}momentumBurnOff(){if(this.disposed)return;let e=this.momentumVelocityPxPerS.clone().multiplyScalar(.007);.3>e.length()||(this.map.panPx(e),this.momentumVelocityPxPerS.multiplyScalar(.99),setTimeout(this.momentumBurnOff.bind(this),7e-6))}handleGesture(e,t){this.handleMoveGesture(e,t),this.handleZoomGesture(e)}handleMoveGesture(e,t){let i=this.getGestureCenter(),s=this.getGestureCenter(e),n=s.sub(i);this.handleMove(n,t)}handleZoomGesture(e){let t=this.getGestureCenter(),i=this.getGestureCenter(e),s=this.currentEvents.map(e=>new r(this.getLocalX(e),this.getLocalY(e)).distanceTo(t)).reduce((e,t)=>e+t),n=this.currentEvents.map(i=>i.pointerId===e.pointerId?new r(this.getLocalX(e),this.getLocalY(e)).distanceTo(t):new r(this.getLocalX(i),this.getLocalY(i)).distanceTo(t)).reduce((e,t)=>e+t),a=(n-s)/Math.max(n,s);this.map.zoom(a,i)}getGestureCenter(e){let t=this.currentEvents.map(t=>e&&t.pointerId===e.pointerId?this.getLocalX(e):this.getLocalX(t)).reduce((e,t)=>e+t)/this.currentEvents.length,i=this.currentEvents.map(t=>e&&t.pointerId===e.pointerId?this.getLocalY(e):this.getLocalY(t)).reduce((e,t)=>e+t)/this.currentEvents.length;return new r(t,i)}getLocalX(e){return e.clientX-this.map.container.offsetLeft}getLocalY(e){return e.clientY-this.map.container.offsetTop}dispose(){this.disposed=!0,this.deregisterListeners()}constructor(e){this.map=e,this.currentEvents=[],this.moveEventCache=[],this.momentumVelocityPxPerS=new r,this.pointerDownRef=this.handlePointerDown.bind(this),this.pointerUpRef=this.handlePointerUp.bind(this),this.pointerOutRef=this.handlePointerUp.bind(this),this.pointerMoveRef=this.handlePointerMove.bind(this),this.wheelRef=this.handleWheel.bind(this),this.contextMenuRef=e=>{e.preventDefault()},this.registerListeners(),this.disposed=!1}}var o=i(166);class l{constructor(e,t,i,s,n,r){}}class h extends o.Sprite{constructor(e,t,i){super(i),this.properties=e,this.layerId=t}}class c{constructor(){}}class d extends c{async get(e){let t=this.cache.has(e);if(t){this.cache.delete(e),this.cache.add(e);let t=o.Assets.get(e);return null!=t?t:o.Assets.load(e)}for(;this.cache.size>this.maxSize;){let e=this.cache.keys().next().value;o.Assets.unload(e),this.cache.delete(e)}try{let t=o.Assets.load(e);return this.cache.add(e),t}catch(t){console.log("Failed to fetch asset ".concat(e,". Error: ").concat(t))}}clear(){this.cache.forEach((e,t)=>{o.Assets.unload(t)}),this.cache.clear()}constructor(e){super(),this.cache=new Set,this.maxSize=e}}class g{constructor(){this.isInteractive=!1,this.revalidateTile=async e=>{}}}class u extends g{async getTile(e){let t=this.urlTemplate.replace("{x}",e.x.toString()).replace("{y}",e.y.toString()).replace("{z}",e.z.toString()),i={image:t,enablePrimaryClick:this.isInteractive,id:"".concat(e.x,"/").concat(e.y,"/").concat(e.x),layerId:this.id};return i}constructor(e){super(),this.urlTemplate=e}}class p extends g{getTile(e){return this.getPoints(e)}constructor(e,t){super(),this.getPoints=e,this.styleFunc=t}}class y{async renderTile(e,t){if(t instanceof u)return await this.renderRasterTile(e);if(t instanceof p)return await this.renderPointTile(e,t.styleFunc);throw Error("Layer type is not recognised.")}async renderRasterTile(e){let t=await this.assetCache.get(e.image),i=new h(e.id,e.layerId,t);return(e.enablePrimaryClick||e.enableSecondaryClick)&&this.makeClickable(i),i}async renderPointTile(e,t){let i=new o.Container;for(let s=0;s<e.points.length;s++){let n=e.points[s],r=t(n);if(r.image){let t=await this.assetCache.get(r.image),s=new h(n.properties,e.layerId,t);s.x=n.coordinates[0]*this.tileScaleFactor-s.width/2,s.y=n.coordinates[1]*this.tileScaleFactor-s.height,s.tint=16711680,n.properties.id&&this.makeClickable(s),i.addChild(s)}}return i}constructor(e,t){this.assetCache=new d(5e3),this.makeClickable=e,this.tileScaleFactor=t/256}}class m{makeClickable(e){e.eventMode="static",e.onpointerdown=this.handlePointerDown,e.onpointermove=this.handlePointerMove,e.onpointerup=this.handlePointerUp,e.onpointercancel=this.handlePointerCancel}hasPointerMovedTooMuch(e){let t=Math.abs(e.x-this.initialPointerPosition.x),i=Math.abs(e.y-this.initialPointerPosition.y);return t>this.POINTER_MOVE_THRESHOLD_PX||i>this.POINTER_MOVE_THRESHOLD_PX}triggerClickEvent(e){let t=this.getLatLongFromGlobal(e.global.x,e.global.y),i={clientX:e.clientX,clientY:e.clientY,lat:t.lat,long:t.long,spriteProperties:e.target.properties,layerId:e.target.layerId};this.onClickHandler&&this.onClickHandler(i)}constructor(e,t,i){this.LONG_PRESS_DURATION_MS=500,this.POINTER_MOVE_THRESHOLD_PX=5,this.handlePointerDown=e=>{if(this.activePointers.add(e.pointerId),this.activePointers.size>1){this.isLongPressTimerRunning&&(clearTimeout(this.longPressTimeout),this.isLongPressTimerRunning=!1);return}this.initialPointerPosition.x=e.client.x,this.initialPointerPosition.y=e.client.y,this.longPressTimeout=window.setTimeout(()=>this.triggerLongPressEvent(e),this.LONG_PRESS_DURATION_MS),this.isLongPressTimerRunning=!0},this.handlePointerMove=e=>{if(!this.isLongPressTimerRunning)return;let t=new r(e.client.x,e.client.y);this.hasPointerMovedTooMuch(t)&&(clearTimeout(this.longPressTimeout),this.isLongPressTimerRunning=!1)},this.handlePointerUp=e=>{if(this.activePointers.delete(e.pointerId),!this.isLongPressTimerRunning)return;clearTimeout(this.longPressTimeout),this.isLongPressTimerRunning=!1;let t=new r(e.client.x,e.client.y);this.hasPointerMovedTooMuch(t)||this.triggerClickEvent(e)},this.handlePointerCancel=e=>{this.activePointers.delete(e.pointerId),this.isLongPressTimerRunning&&(clearTimeout(this.longPressTimeout),this.isLongPressTimerRunning=!1)},this.triggerLongPressEvent=e=>{this.isLongPressTimerRunning=!1;let t=this.getLatLongFromGlobal(e.global.x,e.global.y),i={clientX:e.clientX,clientY:e.clientY,lat:t.lat,long:t.long,spriteProperties:e.target.properties,layerId:e.target.layerId};this.onContextHandler&&this.onContextHandler(i)},this.isLongPressTimerRunning=!1,this.longPressTimeout=0,this.initialPointerPosition=new r,this.activePointers=new Set,this.getLatLongFromGlobal=e,this.onClickHandler=t,this.onContextHandler=i}}var M=i(1032);let x={get3857XFromLong:e=>6378137*(e*Math.PI/180),get3857YFromLat:e=>6378137*Math.log(Math.tan(Math.PI/4+e*Math.PI/180/2)),getLongFrom3857X:e=>e/6378137*180/Math.PI,getLatFrom3857Y:e=>(2*Math.atan(Math.exp(e/6378137))-Math.PI/2)*180/Math.PI,tileToWebMercator(e,t,i){let s=2*Math.PI*6378137/256/Math.pow(2,i);return{x:256*e*s-2*Math.PI*6378137/2,y:-(256*t*s-2*Math.PI*6378137/2)}},WebMercatorToTile(e,t,i){let s=2*Math.PI*6378137/256/Math.pow(2,i);return{x:(e+2*Math.PI*6378137/2)/(256*s),y:-(t-2*Math.PI*6378137/2)/(256*s),z:i}},getMercatorXFromLng(e,t){let i=arguments.length>2&&void 0!==arguments[2]&&arguments[2],s=Math.pow(2,Math.floor(t))*(Math.PI/180*e+Math.PI)/(2*Math.PI);return i?s:Math.floor(s)},getMercatorYFromLat(e,t){let i=arguments.length>2&&void 0!==arguments[2]&&arguments[2],s=Math.pow(2,Math.floor(t))*(Math.PI-Math.log(Math.tan(Math.PI/4+Math.PI/180*e/2)))/(2*Math.PI);return i?s:Math.floor(s)},getLngFromMercatorX(e,t){return this.getValidLong(180/Math.PI*(2*Math.PI*e/Math.pow(2,Math.floor(t))-Math.PI))},getLatFromMercatorY:(e,t)=>180/Math.PI*(2*(Math.atan(Math.exp(Math.PI-2*Math.PI*e/Math.pow(2,Math.floor(t))))-Math.PI/4)),getValidLong(e){if(e>180||e<-180){let t=e%360;return t>180?t-360:t<-180?t+360:t}return e},getMercatorFromXYZOld:(e,t,i)=>"".concat(e,",").concat(t,",").concat(i),getMercatorKeyFromXYZ:(e,t,i)=>4398046511104*i+2097152*e+t,getXYZFromMercatorKey:e=>{let t=Math.floor(e/4398046511104),i=Math.floor((e-4398046511104*t)/2097152);return{x:i,y:e-4398046511104*t-2097152*i,z:t}},getParentMercatorKeys:e=>{let t=[],i=x.getXYZFromMercatorKey(e);for(let e=i.z-1;e>=0;e--){let s=x.getMercatorKeyFromXYZ(Math.floor(i.x/Math.pow(2,i.z-e)),Math.floor(i.y/Math.pow(2,i.z-e)),e);t.push(s)}return t},getValidMercatorPoint(e){let t=e.clone(),i=Math.pow(2,t.z);for(;t.x<0||t.x>=Math.pow(2,t.z);)t.x=t.x<0?t.x+i:t.x-i;for(;t.y<0||t.y>=Math.pow(2,t.z);)t.y=t.y<0?t.y+i:t.y-i;return t}};class f{getParentTile(){let e=this.getValidTile();return new f(e.x>>>1,e.y>>>1,e.z-1)}isYValid(){return!(this.y<0||this.y>=Math.pow(2,this.z))}isXValid(){return!(this.x<0||this.x>=Math.pow(2,this.z))}getValidTile(){let e=new f(this.x,this.y,this.z),t=Math.pow(2,this.z);for(;!e.isXValid();){let i=e.x%t;e.x=i<0?t+i:e.x%t}for(;!e.isYValid();)e.y=e.y%t;return e.key=x.getMercatorKeyFromXYZ(e.x,e.y,e.z),e}constructor(e,t,i){this.x=e,this.y=t,this.z=i,this.key=x.getMercatorKeyFromXYZ(e,t,i)}}class P{updateTile(e){this.layer=e,this.updateTileAsync(e)}async updateTileAsync(e){let t=await e.getTile(this.displayTile),i=await this.tileRenderer.renderTile(t,e);this.addAssetToTile(i)}addAssetToTile(e){this.tileContainer.children.length>0&&this.tileContainer.removeChildAt(0),this.tileContainer.addChildAt(e,0)}addChild(e){if(e.tile.getParentTile().key===this.tile.key&&e.layer instanceof u&&e.tileContainer.children.length>0){0===this.tileContainer.children.length&&this.tileContainer.addChild(new o.Container);let t=e.tileContainer.children[0];t instanceof o.Container&&(t.scale.x=t.scale.x/2,t.scale.y=t.scale.y/2,t.position.x=e.tile.x%2*t.height,t.position.y=e.tile.y%2*t.width,this.tileContainer.children[0].addChild(t))}}getChildren(){let e=[];for(let t=0;t<=1;t++)for(let i=0;i<=1;i++){let s=new f(2*this.tile.x+t,2*this.tile.y+i,this.tile.z+1),n=this.tileContainer.height/2,r=new o.Rectangle(t*n,i*n,n,n),a=this.getTileContainerSection(r);e.push(new P(s,this.tileRenderer,a))}return e}getTileContainerSection(e){let t=new o.Container;if(this.layer instanceof u&&this.tileContainer.children.length>0){let i=this.tileContainer.children[0];i instanceof o.Sprite&&t.addChild(this.getSpriteSection(i,e))}return t}getSpriteSection(e,t){let i=e.texture.orig.height/e.texture.baseTexture.height;t.height=t.height*i,t.width=t.width*i,t.x=e.texture.orig.x+t.x*i,t.y=e.texture.orig.y+t.y*i;let s=new o.Texture(e.texture.baseTexture,t),n=new o.Sprite(s);return n.scale.x=n.scale.x/i*2,n.scale.y=n.scale.y/i*2,n}constructor(e,t,i=new o.Container){this.tile=e,this.tileContainer=i,this.tileRenderer=t,this.displayTile=e.getValidTile()}}class C{add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}sub(e){return this.x=this.x-e.x,this.y=this.y-e.y,this.z=this.z-e.z,this}divideScalar(e){return this.x=this.x/e,this.y=this.y/e,this.z=this.z/e,this}multiplyScalar(e){return this.x=this.x*e,this.y=this.y*e,this.z=this.z*e,this}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}length(){return Math.pow(Math.pow(this.x,2)+Math.pow(this.y,2)+Math.pow(this.z,2),.5)}clone(){return new C(this.x,this.y,this.z)}distanceTo(e){return e.clone().sub(this).length()}constructor(e=0,t=0,i=0){this.x=e,this.y=t,this.z=i}}class T{resize(e,t){this.screenWidth=e,this.screenHeight=t,this.refreshTiles()}setPosition(e){let t=Math.floor(e.zoom),i=x.getMercatorXFromLng(e.long,t,!0),s=x.getMercatorYFromLat(e.lat,t,!0),n=Math.floor(i),a=Math.floor(s),o=new f(n,a,t),l=new P(o,this.tileRenderer);l.updateTile(this.layer);let h=new r(this.screenWidth/2-i%1*this.tileSize,this.screenHeight/2-s%1*this.tileSize);this.cullTiles(this.tileMap),this.addTileAtGlobal(l,h),this.refreshTiles()}refreshTile(e){let t=x.getParentMercatorKeys(e);t.push(e);for(let e=0;e<t.length;e++){let i=this.tileMap.get(t[e]);i&&i.updateTile(this.layer)}}addTileAtGlobal(e,t){this.layerContainer.addChild(e.tileContainer);let i=this.layerContainer.toLocal(t);return e.tileContainer.position.x=i.x,e.tileContainer.position.y=i.y,this.tileMap.set(e.tile.key,e),e}getFirstTile(){return this.tileMap.entries().next().value[1]}refreshTiles(){let e=this.getVisableTiles(),t=this.getTilesToCull(e),i=this.tileMap.entries().next().value[1],s=[];for(let t=0;t<e.length;t++)if(!this.tileMap.has(e[t].key)){let i=new P(e[t],this.tileRenderer);i.updateTile(this.layer),s.push(i)}this.addTilesToScene(s,i),this.cullTiles(t)}getVisableTiles(){let e=this.getHypotenuse(this.screenHeight,this.screenWidth)/2;return this.getTilesInRadius(e)}getHypotenuse(e,t){return Math.pow(Math.pow(e,2)+Math.pow(t,2),.5)}getTilesInRadius(e){let t=[],i=Math.floor(e/this.tileSize/this.layerContainer.scale.x)+2,s=this.getMercatorCenter().clone().floor();for(let e=-i;e<i;e++)for(let n=-i;n<i;n++)if(this.getHypotenuse(e,n)<i){x.getMercatorKeyFromXYZ(s.x+n,s.y+e,s.z);let i=new f(s.x+n,s.y+e,s.z);i.isYValid()&&t.push([Math.abs(e)+Math.abs(n),i])}return t.sort((e,t)=>t[0]-e[0]),t.map(e=>e[1])}getMercatorCenter(){let e=this.tileMap.entries().next().value[1],t=e.tileContainer.getGlobalPosition(),i=new r(t.x,t.y),s=new r(this.screenWidth,this.screenHeight).divideScalar(2),n=s.clone().sub(i).divideScalar(this.tileSize).divideScalar(this.layerContainer.scale.x),a=new C(e.tile.x+n.x,e.tile.y+n.y,e.tile.z);return a}getMercatorAtGlobal(e,t){let i=this.tileMap.entries().next().value[1],s=i.tileContainer.getGlobalPosition(),n=new r(s.x,s.y),a=new r(e,t),o=a.clone().sub(n).divideScalar(this.tileSize).divideScalar(this.layerContainer.scale.x),l=new C(i.tile.x+o.x,i.tile.y+o.y,i.tile.z);return l}addTilesToScene(e,t){e.forEach(e=>{this.tileMap.has(e.tile.key)||(this.layerContainer.addChild(e.tileContainer),e.tileContainer.position.x=t.tileContainer.x+(e.tile.x-t.tile.x)*this.tileSize,e.tileContainer.position.y=t.tileContainer.y+(e.tile.y-t.tile.y)*this.tileSize,this.tileMap.set(e.tile.key,e))})}getTilesToCull(e){let t=new Map(e.map(e=>[e.key,e])),i=new Map;return this.tileMap.forEach((e,s)=>{t.has(s)||i.set(s,e)}),i}cullTiles(e){e.forEach((e,t)=>{e.tileContainer.destroy(),this.tileMap.delete(t)})}moveTiles(e){this.tileMap.forEach(t=>{t.tileContainer.position.x+=e.x,t.tileContainer.position.y+=e.y})}increaseTileZ(){let e;let t=this.tileMap.entries().next().value[1],i=new f(2*t.tile.x,2*t.tile.y,t.tile.z+1),s=t.tileContainer.getGlobalPosition(),n=this.layerContainer.scale.x/2,r=[];this.tileMap.forEach(t=>{let s=t.getChildren();for(let t=0;t<s.length;t++){let n=s[t];r.push(n),s[t].updateTile(this.layer),n.tile.key===i.key&&(e=n)}}),e||(e=new P(i,this.tileRenderer)),this.cullTiles(this.tileMap),this.layerContainer.scale.x=n,this.layerContainer.scale.y=n;let a=this.addTileAtGlobal(e,s);this.addTilesToScene(r,a)}decreaseTileZ(){var e,t;let i=this.tileMap.entries().next().value[1],s=i.tile.getParentTile();i.tile.x%2==1&&(i.tileContainer.position.x-=this.tileSize),i.tile.y%2==1&&(i.tileContainer.position.y-=this.tileSize);let n=i.tileContainer.getGlobalPosition();i.tile.x%2==1&&(i.tileContainer.position.x+=this.tileSize),i.tile.y%2==1&&(i.tileContainer.position.y+=this.tileSize);let r=this.getMercatorCenter();r.z--,r.x=r.x>>>1,r.y=r.y>>>1;let a=2*this.layerContainer.scale.x,o=new Map;for(let[e,i]of this.tileMap)for(let e=0;e<=1;e++)for(let e=0;e<=1;e++){let e=i.tile.getParentTile();o.has(e.key)||o.set(e.key,{distanceFromCenter:this.getHypotenuse(r.x-e.x,r.y-e.y),tile:new P(e,this.tileRenderer)}),null===(t=o.get(e.key))||void 0===t||t.tile.addChild(i)}this.cullTiles(this.tileMap),this.layerContainer.scale.x=a,this.layerContainer.scale.y=a;let l=(null===(e=o.get(s.key))||void 0===e?void 0:e.tile)||new P(s,this.tileRenderer);o.has(s.key)||(l.updateTile(this.layer),o.delete(s.key)),this.addTileAtGlobal(l,n);let h=[...o].map(e=>e[1]);h.sort((e,t)=>t.distanceFromCenter-e.distanceFromCenter);for(let e=0;e<h.length;e++)h[e].tile.updateTile(this.layer);this.addTilesToScene(h.map(e=>e.tile),l)}constructor(e,t,i,s,n,r){this.idCount=0,this.layer=e,this.tileMap=new Map,this.tileRenderer=r,this.layerContainer=t,this.screenHeight=i,this.screenWidth=s,this.tileSize=n}}class v{refresh(){this.tileManager.refreshTiles()}resize(e,t){this.tileManager.resize(e,t)}setPosition(e){this.tileManager.setPosition(e)}getPosition(){let e=this.tileManager.getMercatorCenter(),t=e.z+(this.layerContainer.scale.x-this.map.mapOptions.minScale)/this.map.mapOptions.minScale;return{lat:x.getLatFromMercatorY(e.y,Math.floor(e.z)),long:x.getLngFromMercatorX(e.x,Math.floor(e.z)),zoom:t}}revalidateTile(e){this.layer.revalidateTile(e).then(()=>this.tileManager.refreshTile(e))}getLatLongFromGlobal(e,t){let i=this.tileManager.getMercatorAtGlobal(e,t);return{lat:x.getLatFromMercatorY(i.y,i.z),long:x.getLngFromMercatorX(i.x,i.z)}}panPx(e){let t=e.clone(),i=this.layerContainer.scale.x;this.getMapTopPx()+t.y>0&&t.y>0?t.y=0:this.getMapBottomPx()+t.y<this.map.container.clientHeight&&t.y<0&&(t.y=0),this.tileManager.moveTiles(t.divideScalar(i))}zoom(e,t){let i=this.layerContainer.scale.x*(1+e),s=this.tileManager.getFirstTile().tile.z;if(3===s&&i<.9&&e<0)return;this.layerContainer.scale.x=i,this.layerContainer.scale.y=i;let n=t.x/i,a=t.y/i,o=a-a*(1+e);if(this.getMapTopPx()+o>0)o=0;else if(this.getMapBottomPx()+o<this.map.container.clientHeight){let t=this.map.container.clientHeight/i;o=t-t*(1+e)}this.tileManager.moveTiles(new r(n-n*(1+e),o)),i<this.map.mapOptions.minScale&&s>0?this.tileManager.decreaseTileZ():i>this.map.mapOptions.maxScale&&s<this.map.mapOptions.maxZoom&&this.tileManager.increaseTileZ(),this.refresh()}getMapTopPx(){let e=this.tileManager.getFirstTile(),t=e.tileContainer.getGlobalPosition().y,i=t-e.tile.y*this.map.mapOptions.tileSize*this.layerContainer.scale.x;return i}getMapBottomPx(){let e=this.tileManager.getFirstTile(),t=this.layerContainer.scale.x,i=e.tileContainer.getGlobalPosition().y+this.map.mapOptions.tileSize*t,s=i+(Math.pow(2,e.tile.z)-1-e.tile.y)*this.map.mapOptions.tileSize*t;return s}getFirstTile(){return this.tileManager.getFirstTile()}increaseTileZ(){this.tileManager.increaseTileZ()}decreaseTileZ(){this.tileManager.decreaseTileZ()}constructor(e,t,i){this.map=e,this.layer=t,this.layerContainer=new o.Container,e.stage.addChild(this.layerContainer),this.tileManager=new T(t,this.layerContainer,e.container.clientHeight,e.container.clientWidth,e.mapOptions.tileSize,e.tileRenderer),this.tileManager.setPosition(i)}}class w{refresh(){this.layers.forEach(e=>e.refresh())}resize(e,t){this.layers.forEach(i=>i.resize(e,t))}setPosition(e){0===this.layers.length&&(this.initialPosition=e),this.layers.forEach(t=>t.setPosition(e))}getPosition(){return this.layers[0].getPosition()}refreshTile(e){this.layers.forEach(t=>t.revalidateTile(e))}getLatLongFromGlobal(e,t){return this.layers[0].getLatLongFromGlobal(e,t)}addLayer(e,t){if(t&&t>this.layers.length)throw Error("Index out out of range adding new layer in PixiTileManager.");e.id=this.idCounter++;let i=0===this.layers.length?this.initialPosition:this.layers[0].getPosition(),s=new v(this.map,e,i);t?this.layers.splice(t,0,s):this.layers.push(s)}getLayers(){return this.layers.map(e=>e.layer)}panPx(e){this.layers.forEach(t=>t.panPx(e))}zoom(e,t){this.layers.forEach(i=>i.zoom(e,t))}constructor(e){this.layers=[],this.idCounter=0,this.map=e,this.initialPosition={lat:0,long:0,zoom:3}}}class S extends l{registerPixiInspector(){globalThis.__PIXI_RENDERER__=this.renderer,globalThis.__PIXI_STAGE__=this.stage,window.__PIXI_INSPECTOR_GLOBAL_HOOK__&&window.__PIXI_INSPECTOR_GLOBAL_HOOK__.register({PIXI:o})}initRenderer(e){return new o.Renderer({width:e.clientWidth,height:e.clientHeight,backgroundColor:16777215})}animate(){this.isDestroyed||(this.renderer.render(this.stage),requestAnimationFrame(this.animate.bind(this)))}refresh(){this.layerManager.refresh(),this.shouldRefreshCounter=0}onResize(e){if(!this.isDestroyed)for(let t of e)t.target===this.container&&(this.renderer.resize(this.container.clientWidth,this.container.clientHeight),this.layerManager.resize(this.container.clientWidth,this.container.clientHeight))}addLayer(e,t){this.layerManager.addLayer(e)}getLayers(){return this.layerManager.getLayers()}setPosition(e){this.layerManager.setPosition(e);let t=e.zoom%1*this.mapOptions.minScale+this.mapOptions.minScale;this.stage.scale.x=t,this.stage.scale.y=t}getPosition(){return this.layerManager.getPosition()}revalidateTile(e){this.layerManager.refreshTile(e)}panPx(e){this.layerManager.panPx(e),this.shouldRefreshCounter+=20,this.shouldRefreshCounter>this.mapOptions.tileSize&&this.refresh(),this.onMapMove&&this.onMapMove(this.getPosition())}zoom(e,t){this.layerManager.zoom(e,t),this.onMapMove&&this.onMapMove(this.getPosition()),this.shouldRefreshCounter+=150}destroy(){this.resizeObserver.disconnect(),this.isDestroyed=!0,this.container.removeChild(this.renderer.view),this.renderer.destroy(),this.stage.destroy()}constructor(e,t,i,s,n,r){super(e,t,i,s,n,r),this.isDestroyed=!1,this.container=e,this.mapOptions=t;let a=(0,M.debounce)(this.onResize.bind(this),200,{maxWait:400});this.resizeObserver=new ResizeObserver(a),this.resizeObserver.observe(this.container),this.renderer=this.initRenderer(e),e.appendChild(this.renderer.view),this.registerPixiInspector(),this.layerManager=new w(this),this.interactionManager=new m(this.layerManager.getLatLongFromGlobal.bind(this.layerManager),s,n),this.onMapMove=r,this.stage=new o.Container,this.tileRenderer=new y(this.interactionManager.makeClickable.bind(this.interactionManager),this.mapOptions.tileSize),this.layerManager.setPosition(i),this.refresh(),this.shouldRefreshCounter=0,this.animate()}}let z={tileSize:512,minScale:.7,maxScale:1.4,maxZoom:19},L=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{lat:0,long:0,zoom:3},s=arguments.length>3&&void 0!==arguments[3]?arguments[3]:z,r=arguments.length>4?arguments[4]:void 0,o=arguments.length>5?arguments[5]:void 0,l=arguments.length>6?arguments[6]:void 0,h=(0,n.useRef)();return(0,n.useEffect)(()=>{let n,c,d;return e&&(n=!0,c=new S(e,null!=s?s:z,i,r,o,l),h.current=c,t.forEach(e=>c.addLayer(e)),d=new a(c)),()=>{n&&(d.dispose(),c.destroy())}},[e]),h.current};var I=e=>{let{layers:t,mapOptions:i,position:r,revalidateTile:a,onClick:o,onContext:l,onMapMove:h}=e,c=(0,n.useRef)(null),[d,g]=(0,n.useState)(r),[u,p]=(0,n.useState)(a),[y,m]=(0,n.useState)(),M=L(c.current,t,r,i,o,l,h);return r!==d&&r&&(null==M||M.setPosition(r),g(r)),a!==u&&a&&(null==M||M.revalidateTile(a),p(a)),y!==h&&(M&&(M.onMapMove=h),m(()=>h)),(0,s.jsx)("div",{className:"w-full h-full flex-grow select-none overflow-hidden",ref:c})};class E{constructor(e){this.layers=[],this.handleClick=e=>{},this.handleContext=e=>{},this.getContextMenuContent=()=>[],this.getMapLayers=()=>this.layers,this.chartId=e}}class R extends E{constructor(e,t){super(e),this.contextControls=t}}class b extends R{destroy(){}constructor(e,t){super(e,t),this.handleContext=e=>{this.contextControls.setMenuPosition(new r(e.clientX,e.clientY));let t=this.contextControls.composeContextMenuContent(e,()=>this.contextControls.setMenu(null));this.contextControls.setMenu(t)};let i=new u("https://cdn.lima-labs.com/{z}/{x}/{y}.png?api=7324MSk4UfgMTGAsc875NCasdfuKWweaoA01");i.isInteractive=!0,this.layers=[i]}}function O(e){let{params:t}=e,[i,r]=(0,n.useState)([]),[a,o]=(0,n.useState)(null),[l,h]=(0,n.useState)();return(0,n.useEffect)(()=>{let e=new b(1,{setMenu:o,setMenuPosition:h,composeContextMenuContent:(e,t)=>[]});r(e.getMapLayers())},[]),(0,s.jsx)(I,{layers:i,position:{lat:55,long:-2,zoom:5},mapOptions:{tileSize:512,minScale:.7,maxScale:1.4,maxZoom:19}})}}},function(e){e.O(0,[943,961,181,825,744],function(){return e(e.s=2802)}),_N_E=e.O()}]);