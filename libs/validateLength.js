export default function validateLength(value) {
    if(value.length<2) return "Pole musi zawierać conajmniej 1 znak"
}

export function validateEmail(value) {
    const regex = new RegExp(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/)
    if (!regex.test(value))
     return "Niepoprawny format"
}

export function validatePassword(value) {
    if(value.length<6) return "hasło musi zawierać conajmniej 6 znaków"
}

