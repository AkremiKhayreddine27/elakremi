export class ValidationService {
  static getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
    let config = {
      'required': 'Ce champ est requis !',
      'min': `Valeur minimale est ${validatorValue.min}`,
      'max': `Valeur maximale est ${validatorValue.max}`,
      'minlength': `Ce champ doit contenir au moins ${validatorValue.requiredLength} caractères`,
      'email': 'Adresse e-mail invalide',
      'endDateBefore': "Date de départ doit être aprés la date d'arrivée",
      'startDateAfter': "Date d'arrivée doit être avant la date de départ"
    };
    return config[validatorName];
  }
}
