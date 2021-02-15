exports.generatCustomMessage = (wordList,nameSender)=>{
    let message =``
    if(wordList.length > 1){
        listText=``
        wordList.forEach((element,index) => {
           if(index == 1){
            if(wordList.length > 2){
                listText +=" " +element + " و "
            }else{
                listText +=" " +element + " "
            }
           }
           if(index == 2){
            listText +=" " +element + " "
           }
        });
        if(wordList.length == 2){
            message =`تو ${wordList[0]} و ${listText} هستی. هزاران صفت هم نمی تواند قدردان زحمات تو باشد. تو رو دعوت می کنم به شرکت در قرعه کشی جایزه نقدی 50 میلیون تومانی اپلیکیشن فام.`
            message += `\n` + ` از طرف: ${nameSender}`
            
        }else if(wordList.length == 3){
            message =`تو ${wordList[0]}، ${listText} هستی. هزاران صفت هم نمی تواند قدردان زحمات تو باشد. تو رو دعوت می کنم به شرکت در قرعه کشی جایزه نقدی 50 میلیون تومانی اپلیکیشن فام.`
            message += `\n` + ` از طرف: ${nameSender}`
        }
    }else{
        message=`تو مشوق، همراه و حامی من هستی. هزاران صفت هم نمی تواند قدردان زحمات تو باشد. تو رو دعوت می کنم به شرکت در قرعه کشی جایزه نقدی 50 میلیون تومانی اپلیکیشن فام.`
        message += `\n` + ` از طرف: ${nameSender}` + `\n`
    }
    message +="\n لینک دانلود : \n" + "yun.ir/fam-invitation";
    return message;
}