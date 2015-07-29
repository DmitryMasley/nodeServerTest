<form class="form" id="commentForm" method="get" action="" novalidate="novalidate">
<div class="form-group">
    <label for="cname">Имя</label>
    <input class="form-control" id="cname" name="name" minlength="2" type="text" required="" aria-required="true"/>
</div>

<div class="form-group">
    <label for="mobile_phone">Номер телефона</label>
    <input class="form-control"  id="mobile_phone" name="mobile_phone" required="" aria-required="true"/>
</div>
<div class="form-group">
    <label for="cemail">E-mail</label>
    <input id="cemail" class="form-control"  type="email" name="email" required="" aria-required="true"/>
</div>
<div class="form-group">
    <label for="ccomment">Комментарий</label>
    <textarea class="form-control" id="ccomment" name="comment"></textarea>
</div>
<p>
<button class="submit btn brn-primary" type="submit">ОТПРАВИТЬ</button>
</p>
</form>