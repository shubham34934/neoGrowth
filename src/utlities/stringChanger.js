import { string } from "prop-types";

const getInvoiceName=(invoiceFileName)=>{
    var string=invoiceFileName;
    var underScoreNumbers = 0;
    var secondUnderScoreIndex=0;
    var dotIndex=0;
    for(let i=0; i<string.length;i++){
        if(string.charAt(i)=="n")
         secondUnderScoreIndex=i+2;

        if(string.charAt(i)==".")
         dotIndex=i
    }
    return string.substring(secondUnderScoreIndex, dotIndex)
}

export default getInvoiceName;