define(["jquery"], function($){

    function AddImage(args) {
        var el=args.el;
        var dropTargets=args.dropTargets;
        var dispInfo = document.createElement("div");
        document.body.appendChild(dispInfo);
        dispInfo.innerHTML = "<p> Hint: hold SHIFT while resizing to keep the original aspect ratio.</p>"
        var date = new Date();
        dispInfo.innerHTML += date.toLocaleTimeString();
        var imageWrap = document.createElement("div");
        var image = document.createElement("img");
        image.src = "/images/continent.png";
        imageWrap.setAttribute("draggable", "true");
        imageWrap.className = "dd-item";
        imageWrap.id = "drag" + document.querySelectorAll('.dd-item').length;
        if (el instanceof  Element) {
            el.appendChild(imageWrap);
        } else {
            dropTargets[0].appendChild(imageWrap);
        }
        imageWrap.style.zIndex = 100;
        imageWrap.appendChild(image);
        imageWrap.innerHTML += '<span class="resize-handle resize-handle-nw"></span>\n<span class="resize-handle resize-handle-ne"></span>\n<span class="resize-handle resize-handle-se"></span>\n<span class="resize-handle resize-handle-sw"></span>';
        dispInfo.innerHTML += " image " + imageWrap.id + " ADDED to the element &lt" + imageWrap.parentNode.tagName.toLowerCase() + "&gt at x:" + imageWrap.getBoundingClientRect().left + " y:" + imageWrap.getBoundingClientRect().top + "";

        AddImage.prototype.drag = function (event) {
            var elToDrag = imageWrap;
            elToDrag.style.zIndex = 200;
            var mouseDownAt = {x: event.clientX, y: event.clientY};
            var orig = elToDrag.getBoundingClientRect();
            var deltaX = event.clientX - orig.left;
            var deltaY = event.clientY - orig.top;
            document.ondragstart = function () {
                return false
            };
            document.body.onselectstart = function () {
                return false
            };
            $(document).on("mousemove", moveHandler);
            //document.addEventListener("mousemove", moveHandler, true);
            $(document).on("mouseup", upHandler);
            //document.addEventListener("mouseup", upHandler, true);
            $(".resizable").removeClass("resizable");

            var currentDropTarget, dropTargetRectangles = [];

            function cacheDropTargetRectangles(dropTargets) {
                for (var i = 0, len = dropTargets.length; i < len; i++) {
                    dropTargetRectangles[i] = {};
                    dropTargetRectangles[i].item = dropTargets[i];
                    dropTargetRectangles[i].top = dropTargets[i].getBoundingClientRect().top + parseInt(window.getComputedStyle(dropTargets[i], null).getPropertyValue("border-top-width"));
                    dropTargetRectangles[i].right = dropTargets[i].getBoundingClientRect().right - parseInt(window.getComputedStyle(dropTargets[i], null).getPropertyValue("border-right-width"));
                    dropTargetRectangles[i].bottom = dropTargets[i].getBoundingClientRect().bottom - parseInt(window.getComputedStyle(dropTargets[i], null).getPropertyValue("border-bottom-width"));
                    dropTargetRectangles[i].left = dropTargets[i].getBoundingClientRect().left + parseInt(window.getComputedStyle(dropTargets[i], null).getPropertyValue("border-left-width"));
                }
            }

            cacheDropTargetRectangles(dropTargets);

            function getCurrentTarget(dropTargetRectangles, el) {
                var dropTarget = null;
                for (var i = 0, len = dropTargetRectangles.length; i < len; i++) {
                    var targ = dropTargetRectangles[i];
                    if ((el.getBoundingClientRect().left > targ.left) &&
                        (el.getBoundingClientRect().right < targ.right) &&
                        (el.getBoundingClientRect().top > targ.top) &&
                        (el.getBoundingClientRect().bottom < targ.bottom)) {
                        dropTarget = targ.item;
                    }
                }
                return dropTarget;
            }

            event.stopPropagation();
            event.preventDefault();
            var parentLeft = elToDrag.parentNode.getBoundingClientRect().left + parseInt(window.getComputedStyle(elToDrag.parentNode, null).getPropertyValue("border-left-width"));
            var parentTop = elToDrag.parentNode.getBoundingClientRect().top + parseInt(window.getComputedStyle(elToDrag.parentNode, null).getPropertyValue("border-top-width"));

            function moveHandler(e) {
                if (Math.abs(mouseDownAt.x - e.clientX) < 6 && Math.abs(mouseDownAt.y - e.clientY) < 6) {
                    return;
                }
                elToDrag.style.left = (e.clientX - deltaX - parentLeft) + "px";
                elToDrag.style.top = (e.clientY - deltaY - parentTop) + "px";
                var newTarget = getCurrentTarget(dropTargetRectangles, elToDrag);
                if (currentDropTarget && currentDropTarget !== newTarget) {
                    currentDropTarget.classList.remove("active");
                }
                currentDropTarget = newTarget;
                if (newTarget) {
                    newTarget.classList.add("active");
                }
                e.stopPropagation();
            }

            function upHandler(e) {
                var date = new Date();
                dispInfo.innerHTML = date.toLocaleTimeString();
                document.ondragstart = null;
                document.body.onselectstart = null;
                $(document).off("mouseup", upHandler);
                //document.removeEventListener("mouseup", upHandler, true);
                $(document).off("mousemove", moveHandler);
                //document.removeEventListener("mousemove", moveHandler, true);
                e.stopPropagation();
                if (currentDropTarget) {
                    currentDropTarget.appendChild(elToDrag);
                    elToDrag.style.left = "" + (e.clientX - elToDrag.parentNode.getBoundingClientRect().left - deltaX - window.getComputedStyle(elToDrag.parentNode, null).getPropertyValue("border-left-width").slice(0, -2)) + "px";
                    elToDrag.style.top = "" + (e.clientY - elToDrag.parentNode.getBoundingClientRect().top - deltaY - window.getComputedStyle(elToDrag.parentNode, null).getPropertyValue("border-top-width").slice(0, -2)) + "px";
                    currentDropTarget.classList.remove("active")
                    dispInfo.innerHTML += "  image " + elToDrag.id + " DROPPED to the element &lt" + elToDrag.parentNode.tagName.toLowerCase() + "&gt at x:" + elToDrag.getBoundingClientRect().left + " y:" + elToDrag.getBoundingClientRect().top + "";
                } else {
                    elToDrag.style.left = "" + orig.left - elToDrag.parentNode.getBoundingClientRect().left - window.getComputedStyle(elToDrag.parentNode, null).getPropertyValue("border-left-width").slice(0, -2) + "px";
                    elToDrag.style.top = "" + orig.top - elToDrag.parentNode.getBoundingClientRect().top - window.getComputedStyle(elToDrag.parentNode, null).getPropertyValue("border-top-width").slice(0, -2) + "px";
                    if (currentDropTarget === undefined) {
                        currentDropTarget = elToDrag.parentNode;
                        currentDropTarget.appendChild(elToDrag);
                        dispInfo.innerHTML += "  image " + elToDrag.id + " CLICKED at x:" + e.clientX + " y:" + e.clientY + "";
                        if (elToDrag.classList.contains("resizable")) {
                            elToDrag.classList.remove("resizable");
                        } else {
                            elToDrag.classList.add("resizable");
                            resizeableImage(elToDrag);
                        }
                    } else {
                        dispInfo.innerHTML += "  image " + elToDrag.id + " drop FAILED at x:" + elToDrag.getBoundingClientRect().left + " y:" + elToDrag.getBoundingClientRect().top + "";
                    }
                }
                elToDrag.style.zIndex = 100;
                (function () {
                    elToDrag = null;
                }());
            }

            function resizeableImage(container) {
                var parent = {};
                var self = {};
                var min_width = 60;
                var min_height = 60;
                var max_width = 350;
                var max_height = 250;
                var orig_src = {};
                orig_src.item = container.querySelector("img");
                orig_src.width = orig_src.item.naturalWidth;
                orig_src.height = orig_src.item.naturalHeight;
                var handlers = container.querySelectorAll(".resize-handle");
                var source;

                function startResize(e) {
                    parent.left = container.parentNode.getBoundingClientRect().left + parseInt(window.getComputedStyle(container.parentNode, null).getPropertyValue("border-left-width"));
                    parent.top = container.parentNode.getBoundingClientRect().top + parseInt(window.getComputedStyle(container.parentNode, null).getPropertyValue("border-top-width"));
                    parent.width = container.parentNode.getBoundingClientRect().right - parseInt(window.getComputedStyle(container.parentNode, null).getPropertyValue("border-right-width")) - parent.left;
                    parent.height = container.parentNode.getBoundingClientRect().bottom - parseInt(window.getComputedStyle(container.parentNode, null).getPropertyValue("border-bottom-width")) - parent.top;
                    self.left = container.getBoundingClientRect().left - parent.left;
                    self.top = container.getBoundingClientRect().top - parent.top;
                    self.width = container.getBoundingClientRect().right - parent.left - self.left;
                    self.height = container.getBoundingClientRect().bottom - parent.top - self.top;
                    source = this;
                    e.preventDefault();
                    e.stopPropagation();
                    $(document).on('mousemove', resizing);
                    //document.addEventListener('mousemove', resizing, false);
                    $(document).on('mouseup', endResize);
                    //document.addEventListener('mouseup', endResize, false);
                }

                function endResize(e) {
                    e.preventDefault();
                    $(document).off('mouseup', endResize);
                    //document.removeEventListener('mouseup', endResize, false);
                    $(document).off('mousemove', resizing);
                    //document.removeEventListener('mousemove', resizing, false);
                }

                function resizing(e) {
                    if (source.classList.contains('resize-handle-se')) {
                        if (e.shiftKey) {
                            container.style.width = Math.min((Math.max((e.clientX - self.left - parent.left), min_width)), (parent.height - self.top) / orig_src.height * orig_src.width, parent.width - self.left, max_width) + "px";
                            container.style.height = container.style.width.slice(0, -2) / orig_src.width * orig_src.height + "px";
                        } else {
                            container.style.width = Math.min((Math.max((e.clientX - self.left - parent.left), min_width)), max_width, parent.width - self.left) + "px";
                            container.style.height = Math.min((Math.max((e.clientY - self.top - parent.top), min_height)), max_height, parent.height - self.top) + "px";
                        }
                        container.style.left = self.left + "px";
                        container.style.top = self.top + "px";
                    } else if (source.classList.contains('resize-handle-sw')) {
                        if (e.shiftKey) {
                            container.style.width = Math.min((Math.max((self.width - (Math.max(e.clientX, parent.left) - self.left - parent.left)), min_width)), (parent.height - self.top) / orig_src.height * orig_src.width, max_width) + "px";
                            container.style.height = container.style.width.slice(0, -2) / orig_src.width * orig_src.height + "px";
                        } else {
                            container.style.width = Math.min((Math.max((self.width - (Math.max(e.clientX, parent.left) - self.left - parent.left)), min_width)), max_width) + "px";
                            container.style.height = Math.min((Math.max((e.clientY - self.top - parent.top), min_height)), max_height, parent.height - self.top) + "px";
                        }
                        container.style.left = self.left - (container.style.width.slice(0, -2) - self.width) + "px";
                        container.style.top = self.top + "px";
                    } else if (source.classList.contains('resize-handle-nw')) {
                        if (e.shiftKey) {
                            container.style.width = Math.min((Math.max((self.width - (Math.max(e.clientX, parent.left) - self.left - parent.left)), min_width)), (self.height + self.top) / orig_src.height * orig_src.width, max_width) + "px";
                            container.style.height = container.style.width.slice(0, -2) / orig_src.width * orig_src.height + "px";
                        } else {
                            container.style.width = Math.min((Math.max((self.width - (Math.max(e.clientX, parent.left) - self.left - parent.left)), min_width)), max_width) + "px";
                            container.style.height = Math.min((Math.max((self.height - (Math.max(e.clientY, parent.top) - self.top - parent.top)), min_height)), max_height) + "px";
                        }
                        container.style.left = self.left - (container.style.width.slice(0, -2) - self.width) + "px";
                        container.style.top = self.top - (container.style.height.slice(0, -2) - self.height) + "px";
                    } else if (source.classList.contains('resize-handle-ne')) {
                        if (e.shiftKey) {
                            container.style.width = Math.min((Math.max((e.clientX - self.left - parent.left), min_width)), (self.height + self.top) / orig_src.height * orig_src.width, parent.width - self.left, max_width) + "px";
                            container.style.height = container.style.width.slice(0, -2) / orig_src.width * orig_src.height + "px";

                        } else {
                            container.style.width = Math.min((Math.max((e.clientX - self.left - parent.left), min_width)), max_width, parent.width - self.left) + "px";
                            container.style.height = Math.min((Math.max((self.height - (Math.max(e.clientY, parent.top) - self.top - parent.top)), min_height)), max_height) + "px";
                        }
                        container.style.left = self.left + "px";
                        container.style.top = self.top - (container.style.height.slice(0, -2) - self.height) + "px";
                    }
                }

                $(handlers).on('mousedown', startResize);
                /*
                 for (var i=0; i < handlers.length; i++) {
                 handlers[i].addEventListener('mousedown', startResize, false);
                 }
                 */
            }
        };

        $(imageWrap).on('mousedown', this.drag);
        //imageWrap.addEventListener('mousedown', drag, false);
    }
    return AddImage;
});