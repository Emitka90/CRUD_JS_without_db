let users = [];
let currentId = 1;

const ageCalc = function(birthday) {
    birthday = birthday.split('.');
    let todayDate = new Date();
    let todayYear = todayDate.getFullYear();
    let todayMonth = todayDate.getMonth();
    let todayDay = todayDate.getDate();
    let age = todayYear - +birthday[2];
    
    if ( todayMonth < (+birthday[1] - 1)) {
        age--;
    }
    if (((+birthday[1] - 1) == todayMonth) && (todayDay < +birthday[0])) {
        age--;
    }
    return age;
};


module.exports = {
    getUsers: () => users,
    addUser: (user) => {
        user.id = currentId++;
        user.age = ageCalc(user.birthday);
        users.push(user);
    },
    updateUser: (id, updatedData) => {
        const userIndex = users.findIndex(u => u.id === id);
        if (userIndex !== -1) {
            users[userIndex] = { ...users[userIndex], ...updatedData};
            return users[userIndex];
        }
        return null;
    },
    deleteUser: (id) => {
        const userIndex = users.findIndex(u => u.id === id);
        if (userIndex !== -1) {
            users.splice(userIndex, 1);
            return true;
        }
        return false;
    },
    getUserById: (id) => users.find(u => u.id === id)
};