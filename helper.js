module.exports = {
    getPhoneNumber: function (countryCode) {
        const number = Math.floor(100000000 + Math.random() * 900000000);
        return `${countryCode}${number}`;
    },

    getElementByText: async function (obj) {
        return await $(`div*=${obj.toString()}`);
    }
};