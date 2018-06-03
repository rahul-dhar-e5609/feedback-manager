const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default (emails) => {
    //console.log("Entered Emails", emails);
    const invalidEmails = emails
        .split(',')
        .map(email => email.trim())
        .filter(email => re.test(email) === false);//keeping invalid emails here
        //filter function, if you return true, value will be kept inside the array
    //console.log("Invalid Emails", invalidEmails);
    if(invalidEmails.length){
        return `These emails are invalid: ${invalidEmails}`;
    }
    return;
}; 