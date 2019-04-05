<template>
    <div>
        <h1 class='player_logo'>
            <a href="https://github.com/JackChuChou/web-music-player" rel="noopener" target="_blank">
                <i class='player_logo_pic'></i>
            </a>
        </h1>
        <div class='mod_player_login'></div>
    </div>  
</template>
<script>
export default{
    name: 'TopNav'
}
</script>

<style>
.bg_player, .bg_player_mask, body, html ,.content_page_fill , #app {
    width: 100%;
    height: 100%;
    overflow: hidden;
}
body,button,input,textarea,th{
    color: #333;
    background-color: #fff;
    font-size: 14px;
    line-height: 1.5;
    font-family: poppin,Tahoma,Arial,\5FAE\8F6F\96C5\9ED1,sans-serif;
}
body,html{
    min-width: 1100px;
    background-color: #292a2b;
}
blockquote, body, button, dd, dl, dt, fieldset, form, h1, h2, h3, h4, h5, h6, hr, html, input, lengend, li, ol, p, pre, td, textarea, th, ul {
    margin: 0;
    padding: 0;
}
h1, h2, h3, h4, h5, h6 {
    font-size: 100%;
}
.player_logo{
    position: absolute;
    top: 20px;
    left: 20px;
    z-index: 3;
}
a{
    color: #333;
    text-decoration: none;
}
.player_logo_pic{
    background-image: url('../assets/player_logo.png');
    display: inline-block;
    height: 39px;
    width: 226px;
    background-size: cover;
    background-repeat: no-repeat;
    opacity: .3;
    margin-top: -10px;
}
.player_logo_pic:hover{
    opacity: 1;
}
.mod_player_login{
    position: absolute;
    top: 20px;
    right: 20px;
    z-index: 9;
    text-align: right;
    padding-right: 28px;
}
</style>