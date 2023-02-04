export const validOnlyLetter = (str: string) => {
    return str.match(/^[A-Za-z]+$/)
}

export const validLetterAndNumber = (str: string) => {
    return str.match(/^[0-9a-zA-Z]+$/)
}

export const validPhone = (str: string) => {
    return str.match(/^\d{9}$/)
}

export const validNumberCreditCard = (str: string) => {
    return str.match(/^\d{16}$/)
}

export const validCVC = (str: string) => {
    return str.match(/^\d{3}$/)
}

export const validExpiry = (str: string) => {
    const parts = str.split('-')
    const year = parseInt(parts[0], 10)
    const month = parseInt(parts[1], 10)
    const day = parseInt(parts[2], 10)

    return (year >= new Date().getFullYear() && month >= new Date().getMonth()+1 && day >= new Date().getDate())
}

export const validEmail = (email: string) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

export const validPassword = (password: string) => {
    return password.length >= 6
}