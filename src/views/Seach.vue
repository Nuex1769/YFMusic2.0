<template>
    <div class="seach">
        <div class="header">
            <div class="header-input"><input type="text"></div>
            <div class="header-right"><i class="el-icon-s-data"></i></div>
        </div>
    </div>
</template>

<script>
</script>

<style lang="scss" scoped="scoped">
    .header{
        padding: 15px 10px;
        box-sizing: border-box;
        width: 100%;
        display: flex;
        text-align: center;
        height: 60px;
        border-bottom:1px solid #FFFFFF;
        
        .header-right{
            flex: 0 0 48px;
            
            i{
                font-size: 30px;
                vertical-align: middle;
            }
        }
        
        .header-input{
            position: relative;
            flex: 1;
            padding: 0px 40px;
            box-sizing: border-box;
            background: rgba(255,255,255,0.2);
            border-radius: 25px;
            
            input{
                // position: absolute;
                // top: 0;
                // left: 0;
                width: 100%;
                height: 100%;
                border: none;
                background: none;
                border-radius: 25px;
                outline: none;
                font-size: 22px;
                color: #FFFFFF;
            }
        }
    }
</style>
