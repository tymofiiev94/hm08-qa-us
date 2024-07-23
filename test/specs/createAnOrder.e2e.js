const page = require('../../page');
const helper = require('../../helper')

describe('Create an order', () => {
    it('should set the address', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await expect(await helper.getElementByText('East 2nd Street, 601' && '1300 1st St')).toBeExisting();
    });

    it('should select supportive plan', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const supportivePlanIcon = await $(page.supportivePlan);
        await supportivePlanIcon.waitForDisplayed();
        await supportivePlanIcon.click();
        await expect(await helper.getElementByText('Blanket and handkerchiefs')).toBeExisting();
    }); 

    it('should save the phone', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');

        const phoneNumber = helper.getPhoneNumber("+1");
        await page.submitPhoneNumber(phoneNumber);

        await expect(await helper.getElementByText(phoneNumber)).toBeExisting();
    });

    it('should save credit card number', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');

        const creditCardNumber = helper.getCardNumber();
        const cardCodeNumber = helper.getCardCodeNumber();
        await page.addCreditCard(creditCardNumber, cardCodeNumber);
        
        const newCardLabel = await $(page.newCardLabel);
        await newCardLabel.waitForDisplayed();
    
        await expect(newCardLabel).toBeDisplayed();
    });

    it('should write message for driver', async () => {
        await browser.url(`/`);
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
    
        const messageDriver = await $(page.messageDriverField);
        await messageDriver.waitForDisplayed();
        
        const messageText = "Hey, it worked";
        await messageDriver.setValue(messageText);
    
        const inputFieldValue = await messageDriver.getValue();

        await expect(inputFieldValue).toEqual(messageText);
    });

    it('should toggle blanket and handkerchiefs switch', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');

        const supportivePlanIcon = await $(page.supportivePlan);
        await supportivePlanIcon.waitForDisplayed();
        await supportivePlanIcon.click();

        const blanketSwitch = await $(page.blanketsSwitch);
        await blanketSwitch.scrollIntoView();

        await blanketSwitch.click();

        browser.pause(3000);

        await expect(blanketSwitch).toBeEnabled()
    });  

    it('should order 2 ice creams', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');

        const supportivePlanIcon = await $(page.supportivePlan);
        await supportivePlanIcon.waitForDisplayed();
        await supportivePlanIcon.click();

        const addIceCreamButton = await $(page.addIceCreamButton);
        await addIceCreamButton.scrollIntoView();

        await addIceCreamButton.click()
        browser.pause(3000);
        await addIceCreamButton.click()

        const iceCreamCounter = await $(page.iceCreamCounter);
        const iceCreamCounterValue = await iceCreamCounter.getText()

        await expect(iceCreamCounterValue).toEqual('2');
    });  

    it('car search modal should appear', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');

        const phoneNumber = helper.getPhoneNumber("+1");
        await page.submitPhoneNumber(phoneNumber);

        const orderTaxiButton = await $(page.orderTaxiButton);
        await orderTaxiButton.waitForDisplayed();
        await orderTaxiButton.click()

        const carSearchModal = await $(page.carSearchModal);

        const carSearchModalText = await carSearchModal.getText();

        await expect(carSearchModalText).toBe('Car search');
    });

    it('driver info should appear', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');

        const phoneNumber = helper.getPhoneNumber("+1");
        await page.submitPhoneNumber(phoneNumber);

        const orderTaxiButton = await $(page.orderTaxiButton);
        await orderTaxiButton.waitForDisplayed();
        await orderTaxiButton.click()

        const driverInfoModal = await $(page.driverInfoModal);

        await browser.waitUntil(
            async () => await driverInfoModal.isExisting(),
            { timeout: 45_000, timeoutMsg: 'Driver info did not appear within 45 seconds' }
        );
    
        await expect(driverInfoModal).toBeExisting();
    });         
})  