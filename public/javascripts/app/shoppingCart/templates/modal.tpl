<!-- Button trigger modal -->
<button type="button" class="btn" data-toggle="modal" data-target="#myModal">
    ДОБАВИТЬ
</button>

<!-- Modal -->
<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="myModalLabel">Добавить товар в корзину</h4>
            </div>
            <div class="modal-body">
            <form class="form" method="get" action="">
            <div>
                <input id="id" name="id" minlength="1" type="text" required="" aria-required="true" placeholder="id:1234"/>
            </div>
            <div>
                <input id="title" type="text" minlength="3" name="title" required="" aria-required="true" placeholder="title:Crocs Classic 1234"/>
            </div>
            <div>
                <input id="price" type="text" name="price" minlength="2" required="" aria-required="true" placeholder="price:25.5"/>
            </div>
            <div>
                <input id="img" type="text" name="img" required="" aria-required="true" placeholder="img:'/images/crocs.jpg'"></input>
            </div>
            <div class="modal-footer">
                <button class="btn btn-success" type="submit">ДОБАВИТЬ</button>
                <button type="button" class="btn btn-default" data-dismiss="modal">ЗАКРЫТЬ</button>
            </div>
            </form>
            </div>
        </div>
    </div>
</div>