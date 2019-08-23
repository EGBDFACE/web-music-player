<template>
    <div>
        <h1 class='player_logo'>
            <!-- <a href="https://github.com/JackChuChou/web-music-player" rel="noopener" target="_blank">
                <i class='player_logo_pic'></i>
            </a> -->
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
.player_logo{
    position: absolute;
    top: 20px;
    left: 20px;
    z-index: 3;
}
.player_logo_pic{
    background-image: url('../assets/images/logo_jackchu.png');
    display: inline-block;
    height: 39px;
    /* width: 226px; */
    width: 130px;
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