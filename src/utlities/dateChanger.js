const moment = require('moment');

const getDueDate= (invoiceDate)=>{
    var momentObj = moment(invoiceDate, 'YYYY-MM-DD');
    const dueDate= moment(momentObj).add(30, 'days').calendar();
    return moment(dueDate).format('YYYY-MM-DD');
}


export default getDueDate;