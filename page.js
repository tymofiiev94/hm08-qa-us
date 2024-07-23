module.exports = {
    // Inputs
    fromField: '#from',
    toField: '#to',
    phoneNumberField: '#phone',
    codeField: '#code',
    creditCardField: '#number',
    cardCodeField: "/html/body/div/div/div[2]/div[2]/div[2]/form/div[1]/div[2]/div[2]/div[2]/input",
    messageDriverField: "//input[@id='comment' and @name='comment']",

    // Buttons
    callATaxiButton: 'button=Call a taxi',
    phoneNumberButton: '//div[starts-with(text(), "Phone number")]',
    paymentMethodField: "//div[contains(@class, 'pp-button filled')]",
    addCardField: "//div[starts-with(text(), 'Add card')]",
    linkButton: "/html/body/div/div/div[2]/div[2]/div[2]/form/div[3]/button[1]",
    supportivePlan: '//div[starts-with(text(), "Supportive")]',
    nextButton: 'button=Next',
    confirmButton: 'button=Confirm',
    addIceCreamButton: '//*[@id="root"]/div/div[3]/div[3]/div[2]/div[2]/div[4]/div[2]/div[3]/div/div[2]/div[1]/div/div[2]/div/div[3]',
    orderTaxiButton: "/html/body/div/div/div[3]/div[4]/button",

    // Modals
    phoneNumberModal: '.modal',
    paymentMethodModal: "/html/body/div/div/div[2]/div[2]",
    creditCardModal: "/html/body/div/div/div[2]/div[2]/div[2]",
    carSearchModal: "/html/body/div/div/div[5]/div[2]/div[1]/div/div[1]",
    driverInfoModal: '//div[starts-with(text(), "The driver")]',

    //other
    newCardLabel: '/html/body/div/div/div[2]/div[2]/div[1]/div[2]/div[3]/div[3]',
    blanketsSwitch: "/html/body/div/div/div[3]/div[3]/div[2]/div[2]/div[4]/div[2]/div[1]/div/div[2]",
    iceCreamCounter: '/html/body/div/div/div[3]/div[3]/div[2]/div[2]/div[4]/div[2]/div[3]/div/div[2]/div[1]/div/div[2]/div/div[2]',

    // Functions
    fillAddresses: async function(from, to) {
        const fromField = await $(this.fromField);
        await fromField.setValue(from);
        const toField = await $(this.toField);
        await toField.setValue(to);
        const callATaxiButton = await $(this.callATaxiButton);
        await callATaxiButton.waitForDisplayed();
        await callATaxiButton.click();
    },
    fillPhoneNumber: async function(phoneNumber) {
        const phoneNumberButton = await $(this.phoneNumberButton);
        await phoneNumberButton.waitForDisplayed();
        await phoneNumberButton.click();

        const phoneNumberModal = await $(this.phoneNumberModal);
        await phoneNumberModal.waitForDisplayed()
        const phoneNumberField = await $(this.phoneNumberField);
        await phoneNumberField.waitForDisplayed();
        await phoneNumberField.setValue(phoneNumber);
    },
    submitPhoneNumber: async function(phoneNumber) {
        await this.fillPhoneNumber(phoneNumber);
        // we are starting interception of request from the moment of method call
        await browser.setupInterceptor();
        await $(this.nextButton).click();
        // we should wait for response
        // eslint-disable-next-line wdio/no-pause
        await browser.pause(2000);
        const codeField = await $(this.codeField);
        // collect all responses
        const requests = await browser.getRequests();
        // use first response
        await expect(requests.length).toBe(1)
        const code = await requests[0].response.body.code
        await codeField.setValue(code)
        await $(this.confirmButton).click()
    },

    // 
    addCreditCard: async function(creditCardNumber, cardCodeNumber) {
        const paymentMethodField = await $(this.paymentMethodField);
        await paymentMethodField.waitForDisplayed();
        await paymentMethodField.click();

        const paymentMethodModal = await $(this.paymentMethodModal);
        await paymentMethodModal.waitForDisplayed();
        const addCardField = await $(this.addCardField);
        await addCardField.waitForDisplayed();
        await $(this.addCardField).click();
        const creditCardModal = await $(this.creditCardModal);
        await creditCardModal.waitForDisplayed();

        const creditCardField = await $(this.creditCardField);
        await creditCardField.waitForDisplayed();
        await creditCardField.setValue(creditCardNumber);

        const cardCodeField = await $(this.cardCodeField);
        await cardCodeField.waitForDisplayed();
        await cardCodeField.click();
        await cardCodeField.setValue(cardCodeNumber);

        const linkButton = await $(this.linkButton);
        await linkButton.waitForDisplayed();
        await $(this.linkButton).click()
    },
};