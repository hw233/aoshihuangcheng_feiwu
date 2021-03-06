
class ChatUtil {

    /**
    * 根据info显示名称、消息内容
   */
    public static getChatPortText(vo: game.ChatVo) {
        switch (vo.type) {
            case ChatType.GUILD:
            return "<font fontfamily=\"SimHei\" textcolor=0xbd1012>[工会]</font>"
                + "<font fontfamily=\"SimHei\" textcolor=0x01acfe underline = true>" + vo.player_name + "</font>"
                +"<font fontfamily=\"SimHei\" textcolor=0x01acfe>：</font>"
                +"<font fontfamily=\"SimHei\" textcolor=0xbfbfbf>" + vo.content + "</font>";
                // return <Array<egret.ITextElement>>[                  //转换成元素为 egret.ITextElement 的数组
                //     { text: "[工会]", style: { "textColor": 0xbd1012, fontFamily: "SimHei" } }
                //     , { text: vo.player_name, style: { "underline": true, "textColor": 0x01acfe, fontFamily: "SimHei" } }
                //     , { text: "：", style: { "textColor": 0x01acfe, fontFamily: "SimHei" } }
                //     , { text: vo.content, style: { "textColor": 0xbfbfbf, fontFamily: "SimHei" } }
                // ];

            case ChatType.SYSTEM:

                if (vo.config_id > 0){ 
                    return "<font fontfamily=\"SimHei\" textcolor=0x1fd745>[系统]</font>"
                        + "<font fontfamily=\"SimHei\" textcolor=0xbfbfbf>" + this.getSystemEventText(vo.config_id,vo.args) + "</font>"
                }
                else
                    return "<font fontfamily=\"SimHei\" textcolor=0x1fd745>[系统]</font>"
                        + "<font fontfamily=\"SimHei\" textcolor=0xbfbfbf>" + vo.content + "</font>"
                // return <Array<egret.ITextElement>>[                  //转换成元素为 egret.ITextElement 的数组
                //     { text: "[系统]", style: { "textColor": 0x1fd745, fontFamily: "SimHei" } }
                //     , { text: vo.content, style: { "textColor": 0xbfbfbf, fontFamily: "SimHei" } }
                // ];


            // case ChatType.WORLD:

            //  return <Array<egret.ITextElement>>[                  //转换成元素为 egret.ITextElement 的数组
            //         { text: "[世界]", style: { "textColor": 0xb463ff } }
            //         , { text: vo.player_name, style: { "underline": true, "textColor": 0x01acfe } }
            //         , { text: vo.content }
            //     ];
            default:
                return "<font fontfamily=\"SimHei\" textcolor=0xb463ff>[世界]</font>"
                + "<font fontfamily=\"SimHei\" textcolor=0x01acfe \"underline\" = \"true\">" + vo.player_name + "</font>"
                +"<font fontfamily=\"SimHei\" textcolor=0x01acfe>：</font>"
                +"<font fontfamily=\"SimHei\" textcolor=0xbfbfbf>" + vo.content + "</font>";
                // return <Array<egret.ITextElement>>[                  //转换成元素为 egret.ITextElement 的数组
                //     { text: "[世界]", style: { "textColor": 0xb463ff, fontFamily: "SimHei" } }
                //     , { text: vo.player_name, style: { "underline": true, "textColor": 0x01acfe, fontFamily: "SimHei" } }
                //     , { text: "：", style: { "textColor": 0x01acfe, fontFamily: "SimHei" } }
                //     , { text: vo.content, style: { "textColor": 0xbfbfbf, fontFamily: "SimHei" } }
                // ];
        }

    }


    public static getSystemEventText(config_id: number, args: Array<any>) {

        //颜色解析
        let info = App.ConfigManager.getSystemChatByID(config_id);

        let content: string = info.content;
        //content = content.replace(/#[^#]+#/g, function (word) {
        //    return "<font color=" + ConstMailColor[word.substring(1, 2)] + ">" + word.slice(2, -1) + "</font>";
        //});

        //点击事件
        for (let i = 0; i < args.length; i++) {
            let str: string = "";
            for (let j = 0; j < args[i].arg_list.length; j++) {

                if (args[i].arg_list[j].type == 0) {//字符串
                    str += args[i].arg_list[j].value;
                }
                if (args[i].arg_list[j].type == 1) {//物品
                    let item = App.ConfigManager.itemConfig()[args[i].arg_list[j].value];
                    str += "<font href = \"event:item_" + args[i].arg_list[j].value + "\">[" + item.name + "]</font>";
                }
                if (args[i].arg_list[j].type == 2) {
                    let equip = App.ConfigManager.getEquipById(args[i].arg_list[j].value2);
                    str += "<font href = \"event:equip_" + args[i].arg_list[j].value + "\">[" + equip.name + "]</font>";
                }

            }
            content = content.replace("%" + (i + 1), str)
        }
        //跳转消息
           content = content.replace("yy","<font fontfamily=\"SimHei\" href = \"event:skip_"+info.skip+"\">"+info.yy+"</font>");
        return content;

    }



}