define(["lib/ajax", "jquery"], function(ajax, $){

    function SlideShow (args){//img,delay,order,type,el,size
        if (arguments.length>0) this.init(args);

    }//Class Constructor
    SlideShow.prototype.init = function(args) {
        /* img=[{src:"...", description:"..."},...], delay=1000-10000(ms), el=document.querySelector('...'), size={width:"1%-100%", height:"100-1920"}*/
        this.delay = (args && (args.delay <= 10000 && args.delay >= 1000)) ? args.delay : 4000; //*Delay may be >=1sec and <=10sec. Otherwise used default delay.*/
        this.order = (args && args.order === "rtl") ? "rtl" :
            (args && args.order === "ltr") ? "ltr" :
                (args && args.order === "rdm") ? "rdm" : "bidi";
        this.type = (args && args.type === "crossfade") ? "crossfade" : "slide";
        this.el = (args && args.el instanceof Element) ? args.el : document.body.querySelector('.container');
        var minSize = 100, maxSize = 1920;
        var size = (args && args.size) ? args.size : null;
        var height = window.getComputedStyle(this.el,null).getPropertyValue("height").slice(0,-2);
        var width = window.getComputedStyle(this.el,null).getPropertyValue("width").slice(0,-2);
        this.width = ((size) && (size.width) && size.width.slice(-1)=="%" && size.width.slice(0,-1)<=100 && size.width.slice(0,-1)>0 && (width * size.width.slice(0, -1) / 100) >= minSize) ? "" + width * size.width.slice(0, -1) / 100 + "px" :
            ((size) && (size.width) && size.width <= maxSize && size.width >= minSize && size.width <= width) ? "" + size.width + "px" :
                (((!size) || ((size) && (!size.width))) && width <= maxSize && width >= minSize) ? "" + width + "px" :
                    ((size) && (size.width) && (size.width > maxSize || size.width < minSize) && minSize <= width) ? "" + minSize + "px" : "0px"; //minSize > element.width - so we set width to 0px
        this.height = ((size) && (size.height) && size.height.slice(-1)=="%" && size.height.slice(0,-1)<=minSize && size.height.slice(0,-1)>0 && (height * size.height.slice(0, -1) / 100) >= minSize) ? "" + height * size.height.slice(0, -1) / 100 + "px" :
            ((size) && (size.height) && size.height <= maxSize && size.height >= minSize && size.height <= height) ? "" + size.height + "px" :
                (((!size) || ((size) && (!size.height))) && height <= maxSize && height >= minSize) ? "" + height + "px" :
                    ((size) && (size.height) && (size.height > maxSize || size.height < minSize) && minSize <= height) ? "" + minSize + "px" : "0px"; //minSize > element.height - so we set height to 0px
        this.renderWrap();
        this.animationInProgress=false;
        if (args && args.img) {
            this.img=args.img;
            this.renderImages();
        }else{
            var self = this;
            ajax({method:"GET", url:'/images.ajax', timeout:5000, responseSuccess:handleRequest, responseError:handleRequest});
            function handleRequest(result) {
                self.img = (result.data && result.data.length>0) ? result.data : [{"src":"/images/captain america.jpg", "description":"CAPTAIN AMERICA"},{"src":"/images/hulk.jpeg", "description":"HULK"},{"src":"/images/thor.jpg", "description":"THOR"},{"src":"/images/black widow.jpg", "description":"BLACK WIDOW"},{"src":"/images/hawkeye.jpg", "description":"HAWKEYE"}]
                self.renderImages();
            }
        }
    };//Initialization

    SlideShow.prototype.renderWrap = function() {
        this.wrap = document.createElement("div");
        this.wrap.className = "slideshow-wrap";
        this.wrap.innerHTML += '<i class="fa fa-spinner fa-pulse" style="text-shadow:none; font-size:100px; position:relative; top:50%; margin-top:-50px"></i>';
        this.el.appendChild(this.wrap);
        this.wrap.style.width = this.width;
        this.wrap.style.height = this.height;
    };//Render container for images

    SlideShow.prototype.renderImages = function() {
        this.wrap.innerHTML='';
        this.inner = document.createElement("div");
        this.inner.className = "slideshow-inner";
        this.inner.classList.add(this.type);
        var x=20; //button start margin values & 13 is buttons size
        for (var len=this.img.length; (x*len+(x-13))>this.width.slice(0, -2); x--){};
        for(var i = 0, len=this.img.length; i < len; i++) {
            if (len > 1) this.wrap.innerHTML +=('<span class="buttons" data-button="'+(i+1)+'" data-active="'+0+'" style="margin-left:'+(+(x-14)/2-x*len/2+x*i)+'px;"></span> \n');
            if (this.img[i].description) {
                this.inner.innerHTML +=('<div class="item"> \n <img src="'+this.img[i].src+'" /> \n<div class="description"> \n<h2>'+this.img[i].description+'</h2></div></div>');
            } else{
                this.inner.innerHTML +=('<div class="item"> \n <img src="'+this.img[i].src+'" /> </div>');
            }
        }
        this.wrap.innerHTML +=('<span class="fa fa-arrow-circle-left fa-2x arrows" data-arrow="left"></span> \n');
        this.wrap.innerHTML +=('<span class="fa fa-arrow-circle-right fa-2x arrows " data-arrow="right"></span> \n');
        this.wrap.appendChild(this.inner);
        this.items = this.wrap.querySelectorAll('div img, div  div.description, .arrows, .buttons');
        this.btn = this.wrap.querySelectorAll('.buttons');
        this.divs = this.inner.querySelectorAll('.item');
        this.arrowLeft=this.wrap.querySelector('.arrows[data-arrow="left"]');
        this.arrowRight=this.wrap.querySelector('.arrows[data-arrow="right"]');
        if (this.order == "rtl" && this.img.length>1) {
            this.btn[this.btn.length-1].dataset.active = "1";
            this.inner.dataset.status = this.btn.length-1;
            this.divs[this.btn.length-1].className="item active";
        } else if (this.img.length>1){
            this.btn[0].dataset.active = "1";
            this.inner.dataset.status = 0;
            this.divs[0].className="item active";
        }
        this.direction = 1; //for bi-directional order
        this.bindEvents();
        if (this.state=="started" && !(this.interval)) this.start();
    };//Render images

    SlideShow.prototype.bindEvents = function(){
        var self=this;
        (function() {
            $(self.items).on("mouseover", function () {clearInterval(self.interval)});
            $(self.items).on("mouseout", function () {
                if (self.state=="started") self.start();
            });
            /*
             for(var i = 0, len = self.items.length; i < len; i++) {
             (function() {
             self.items[i].addEventListener("mouseover", function () {clearInterval(self.interval)}, true);
             self.items[i].addEventListener("mouseout", function () {
             if (self.state=="started") self.start();
             });
             })();
             }
             */
            $(self.arrowLeft).on("click", function() {
                if (self.animationInProgress==true) return;
                (self.inner.dataset.status == 0) ? (self.inner.dataset.status = self.img.length - 1) : self.inner.dataset.status--;
                self.direction = -1;
            });
            /*
             self.arrowLeft.addEventListener("click", function() {
             if (self.animationInProgress==true) return;
             (self.inner.dataset.status == 0) ? (self.inner.dataset.status = self.img.length - 1) : self.inner.dataset.status--;
             self.direction = -1;
             });
             */
            $(self.arrowRight).on("click", function() {
                if (self.animationInProgress==true) return;
                (self.inner.dataset.status == self.img.length - 1) ? (self.inner.dataset.status = 0) : self.inner.dataset.status++;
                self.direction = 1;
            });
            /*
             self.arrowRight.addEventListener("click", function() {
             if (self.animationInProgress==true) return;
             (self.inner.dataset.status == self.img.length - 1) ? (self.inner.dataset.status = 0) : self.inner.dataset.status++;
             self.direction = 1;
             });
             */
            $(self.btn).on("click", function () {
                if (self.animationInProgress==true) return;
                this.dataset.active = "1";
                self.inner.dataset.status = this.dataset.button-1;
                if (self.order=="bidi" && this.dataset.button==self.btn.length) self.direction = -1;
                if (self.order=="bidi" && this.dataset.button==1) self.direction = 1;
            });
            $(self.divs).on("transitionend", function () {
                if (!self.divs[self.inner.dataset.status].classList.contains("active")){
                    self.divs[self.inner.dataset.status].className = "item active";
                    for(var i = 0, len = self.divs.length; i < len; i++){
                        if (i==self.inner.dataset.status){continue};
                        self.divs[i].className = "item";
                    }
                    setTimeout(function(){self.animationInProgress = false;},0);
                }
            });
            /*
             for(var i = 0, len = self.btn.length; i < len; i++) {
             (function () {
             var j = i;
             self.btn[j].addEventListener("click", function () {
             if (self.animationInProgress==true) return;
             this.dataset.active = "1";
             self.inner.dataset.status = this.dataset.button-1;
             if (self.order=="bidi" && (this.dataset.button-1)==self.btn.length-1) self.direction = -1;
             if (self.order=="bidi" && (this.dataset.button-1)==0) self.direction = 1;
             });
             self.divs[j].addEventListener("transitionend", function () {
             if (!self.divs[self.inner.dataset.status].classList.contains("active")){
             self.divs[self.inner.dataset.status].className = "item active";
             for(var i= 0; i < len;i++){
             if (i==self.inner.dataset.status){continue};
             self.divs[i].className = "item";
             }
             setTimeout(function(){self.animationInProgress = false;},0);
             }
             });
             })();
             }
             */
        })();
        var mutationObserver = new MutationObserver(mutationObjectCallback);
        function mutationObjectCallback(mutationRecordsList) {
            mutationRecordsList.forEach(function(mutationRecord) {
                if ("attributes" === mutationRecord.type && mutationRecord.oldValue !== self.inner.dataset.status) {
                    self.animationInProgress = true;
                    var direction, order;
                    (mutationRecord.oldValue == self.img.length - 1 && self.inner.dataset.status == 0 && self.btn[self.inner.dataset.status].dataset.active == "0" && self.direction == 1) ? (order = "next") & (direction = "left") :
                        (mutationRecord.oldValue == 0 && self.inner.dataset.status == self.img.length - 1 && self.btn[self.inner.dataset.status].dataset.active == "0" && self.direction == -1) ? (order = "prev") & (direction = "right") :
                            (mutationRecord.oldValue > self.inner.dataset.status) ? (order = "prev") & (direction = "right") :
                                (mutationRecord.oldValue < self.inner.dataset.status) ? (order = "next") & ( direction = "left") : 0;
                    self.divs[self.inner.dataset.status].classList.add(order);
                    self.divs[self.inner.dataset.status].offsetWidth;// force reflow
                    self.divs[mutationRecord.oldValue].classList.add(direction);
                    self.divs[self.inner.dataset.status].classList.add(direction);
                    self.btn[self.inner.dataset.status].dataset.active = "1";
                    for (var i = 0, len = self.btn.length; i < len; i++) {
                        if (i != self.inner.dataset.status) {self.btn[i].dataset.active = "0"}
                    }
                }
            });
        }
        mutationObserver.observe(self.inner, {attributes: true, attributeFilter: ["data-status"], attributeOldValue: true, childList: false});
    };//Binding events

    SlideShow.prototype.stop = function() {
        clearInterval(this.interval);
        this.state="stopped";
    };//Stop continual animation

    SlideShow.prototype.start = function() {
        this.state="started";
        if (!this.direction) {
            return;
        } // Don't start animation before render complete
        var self=this;
        this.interval=setInterval(function() { self.animate.call(self) }, self.delay);
    };//Start continual animation

    SlideShow.prototype.animate = function() {
        if (this.img.length<=1) return;
        if (this.animationInProgress==true) return;
        if (this.order=="bidi") {
            (this.inner.dataset.status==this.img.length-1) ? (this.inner.dataset.status--) & (this.direction=-1) :
                (this.inner.dataset.status==0) ? (this.inner.dataset.status++) & (this.direction=1) :
                    (this.direction==1) ? this.inner.dataset.status++ :
                        (this.direction==-1) ? this.inner.dataset.status-- : 0;
        }
        if (this.order=="rtl") {
            (this.inner.dataset.status==0) ? (this.inner.dataset.status=this.img.length-1) : this.inner.dataset.status--;
            this.direction=-1;
        }
        if (this.order=="ltr") {
            (this.inner.dataset.status==this.img.length-1) ? this.inner.dataset.status=0 : this.inner.dataset.status++;
            this.direction=1;
        }
        if (this.order=="rdm") this.inner.dataset.status=Math.floor(Math.random()*this.img.length);
    };//Next image
    /*DetSlideShow.prototype = new SlideShow();
     DetSlideShow.prototype.constructor = DetSlideShow;
     DetSlideShow.superclass=SlideShow.prototype;
     function DetSlideShow(img,detdesc,delay,el,size) {
     if ( arguments.length > 0 )
     this.init(img,detdesc,delay,el,size);
     }
     DetSlideShow.prototype.init = function(img,detdesc,delay,el,size) {
     DetSlideShow.superclass.init.call(this, img,delay,el,size);
     this.detdesc = detdesc;
     }*///Creating subclass
    return SlideShow;
});