import { Injectable } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Property } from './models/property';
import { Subject } from 'rxjs/Subject';
import * as faker from 'faker';

@Injectable()
export class ServicesService {

    refresh: Subject<any> = new Subject();

    serviceCreated: Subject<any> = new Subject();

    source: LocalDataSource = new LocalDataSource();

    public statuses: any[] = [
        { label: 'validée', value: 'validée' },
        { label: 'provisoire', value: 'provisoire' },
        { label: 'annulée', value: 'annulée' },
        { label: 'terminée', value: 'terminée' }
    ];

    public deadlines: any[] = [
        { label: 'une fois', value: 'une fois' },
        { label: 'mois', value: 'mois' },
        { label: 'semestre', value: 'semestre' },
        { label: 'trimestre', value: 'trimestre' },
        { label: 'année', value: 'année' }
    ];

    public frequencies: any[] = [
        { label: 'une fois', value: 'une fois' },
        { label: 'mois', value: 'mois' },
        { label: 'semestre', value: 'semestre' },
        { label: 'trimestre', value: 'trimestre' },
        { label: 'année', value: 'année' }
    ];

    public tvas: any[] = [
        {
            label: '3%',
            value: '3%'
        },
        {
            label: '4%',
            value: '4%'
        },
        {
            label: '5%',
            value: '5%'
        },
        {
            label: '6%',
            value: '6%'
        }
    ];

    public DepensesObligatoire = [
        {
            title: 'Crédit',
            slug: 'credit',
            icon: 'fa fa-cc-mastercard',
            icons: [],
            services: [
                {
                    title: 'Immobilier',
                    slug: 'immobilier',
                    subCategory: {
                        title: 'Crédit',
                        slug: 'credit'
                    },
                    category: {
                        title: 'Dépenses Contraintes',
                        slug: 'depenses-contraintes'
                    }
                },
                {
                    title: 'Travaux',
                    slug: 'travaux',
                    subCategory: {
                        title: 'Crédit',
                        slug: 'credit'
                    },
                    category: {
                        title: 'Dépenses Contraintes',
                        slug: 'depenses-contraintes'
                    }
                },
                {
                    title: 'Consommation',
                    slug: 'consommation',
                    subCategory: {
                        title: 'Crédit',
                        slug: 'credit'
                    },
                    category: {
                        title: 'Dépenses Contraintes',
                        slug: 'depenses-contraintes'
                    }
                },
                {
                    title: 'Autre',
                    slug: 'autre',
                    subCategory: {
                        title: 'Crédit',
                        slug: 'credit'
                    },
                    category: {
                        title: 'Dépenses Contraintes',
                        slug: 'depenses-contraintes'
                    }
                }
            ]
        },
        {
            title: 'Impot & Taxes',
            slug: 'impot-taxes',
            icon: 'fa fa-university',
            icons: [],
            services: [
                {
                    title: 'Impôt sur le revenu',
                    slug: 'impot-sur-le-revenu',
                    subCategory: {
                        title: 'Impot & Taxes',
                        slug: 'impot-taxes'
                    },
                    category: {
                        title: 'Dépenses Contraintes',
                        slug: 'depenses-contraintes'
                    }
                },
                {
                    title: 'Taxe Habitation',
                    slug: 'taxe-habitation',
                    subCategory: {
                        title: 'Impot & Taxes',
                        slug: 'impot-taxes'
                    },
                    category: {
                        title: 'Dépenses Contraintes',
                        slug: 'depenses-contraintes'
                    }
                },
                {
                    title: 'Taxe Foncière',
                    slug: 'taxe-fonciere',
                    subCategory: {
                        title: 'Impot & Taxes',
                        slug: 'impot-taxes'
                    },
                    category: {
                        title: 'Dépenses Contraintes',
                        slug: 'depenses-contraintes'
                    }
                }
            ]
        },
        {
            title: 'Syndic',
            slug: 'syndic',
            icon: 'fa fa-building',
            icons: [],
            services: [
                {
                    title: 'Charge copropriétés',
                    slug: 'charge-coproprietes',
                    subCategory: {
                        title: 'Syndic',
                        slug: 'syndic'
                    },
                    category: {
                        title: 'Dépenses Contraintes',
                        slug: 'depenses-contraintes'
                    }
                },
                {
                    title: 'Autres charges',
                    slug: 'autres-charges',
                    subCategory: {
                        title: 'Syndic',
                        slug: 'syndic'
                    },
                    category: {
                        title: 'Dépenses Contraintes',
                        slug: 'depenses-contraintes'
                    }
                }
            ]
        },
        {
            title: 'Assurances',
            slug: 'assurances',
            icon: 'fa fa-users',
            icons: [],
            services: [
                {
                    title: 'Habitation',
                    slug: 'habitation',
                    subCategory: {
                        title: 'Assurances',
                        slug: 'assurances'
                    },
                    category: {
                        title: 'Dépenses Contraintes',
                        slug: 'depenses-contraintes'
                    }
                },
                {
                    title: 'Crédit',
                    slug: 'credit',
                    subCategory: {
                        title: 'Assurances',
                        slug: 'assurances'
                    },
                    category: {
                        title: 'Dépenses Contraintes',
                        slug: 'depenses-contraintes'
                    }
                },
                {
                    title: 'Autre',
                    slug: 'autre',
                    subCategory: {
                        title: 'Assurances',
                        slug: 'assurances'
                    },
                    category: {
                        title: 'Dépenses Contraintes',
                        slug: 'depenses-contraintes'
                    }
                }
            ]
        },
        {
            title: 'Exploitation',
            slug: 'exploitation',
            icon: '',
            icons: ['fa fa-tint ml-2', 'fa fa-free-code-camp ml-2', 'fa fa-plug ml-2', 'fa fa-wifi ml-2'],
            services: [
                {
                    title: 'Eau',
                    slug: 'eau',
                    subCategory: {
                        title: 'Exploitation',
                        slug: 'exploitation'
                    },
                    category: {
                        title: 'Dépenses Contraintes',
                        slug: 'depenses-contraintes'
                    }
                },
                {
                    title: 'Gaz',
                    slug: 'gaz',
                    subCategory: {
                        title: 'Exploitation',
                        slug: 'exploitation'
                    },
                    category: {
                        title: 'Dépenses Contraintes',
                        slug: 'depenses-contraintes'
                    }
                },
                {
                    title: 'Electricité',
                    slug: 'electricite',
                    subCategory: {
                        title: 'Exploitation',
                        slug: 'exploitation'
                    },
                    category: {
                        title: 'Dépenses Contraintes',
                        slug: 'depenses-contraintes'
                    }
                },
                {
                    title: 'Télécom',
                    slug: 'telecom',
                    subCategory: {
                        title: 'Exploitation',
                        slug: 'exploitation'
                    },
                    category: {
                        title: 'Dépenses Contraintes',
                        slug: 'depenses-contraintes'
                    }
                }
            ]
        },
        {
            title: 'Autre',
            slug: 'autre',
            icon: '',
            icons: [],
            services: []
        }
    ];

    public DepensesCourantes = [
        {
            title: 'Interventions',
            slug: 'interventions',
            icon: 'fa fa-wrench',
            icons: [],
            services: [
                {
                    title: 'Plomberie',
                    slug: 'plomberie',
                    subCategory: {
                        title: 'Interventions',
                        slug: 'interventions'
                    },
                    category: {
                        title: 'Dépenses Courantes',
                        slug: 'depenses-courantes'
                    }
                },
                {
                    title: 'Electroménager',
                    slug: 'electromenager',
                    subCategory: {
                        title: 'Interventions',
                        slug: 'interventions'
                    },
                    category: {
                        title: 'Dépenses Courantes',
                        slug: 'depenses-courantes'
                    }
                },
                {
                    title: 'Electricité',
                    slug: 'electricite',
                    subCategory: {
                        title: 'Interventions',
                        slug: 'interventions'
                    },
                    category: {
                        title: 'Dépenses Courantes',
                        slug: 'depenses-courantes'
                    }
                },
                {
                    title: 'Serrurie',
                    slug: 'serrurie',
                    subCategory: {
                        title: 'Interventions',
                        slug: 'interventions'
                    },
                    category: {
                        title: 'Dépenses Courantes',
                        slug: 'depenses-courantes'
                    }
                },
                {
                    title: 'Chauffage',
                    slug: 'chauffage',
                    subCategory: {
                        title: 'Interventions',
                        slug: 'interventions'
                    },
                    category: {
                        title: 'Dépenses Courantes',
                        slug: 'depenses-courantes'
                    }
                },
                {
                    title: 'Climatisation',
                    slug: 'climatisation',
                    subCategory: {
                        title: 'Interventions',
                        slug: 'interventions'
                    },
                    category: {
                        title: 'Dépenses Courantes',
                        slug: 'depenses-courantes'
                    }
                },
                {
                    title: 'Bricolage',
                    slug: 'bricolage',
                    subCategory: {
                        title: 'Interventions',
                        slug: 'interventions'
                    },
                    category: {
                        title: 'Dépenses Courantes',
                        slug: 'depenses-courantes'
                    }
                },
                {
                    title: 'Extérieur',
                    slug: 'exterieur',
                    subCategory: {
                        title: 'Interventions',
                        slug: 'interventions'
                    },
                    category: {
                        title: 'Dépenses Courantes',
                        slug: 'depenses-courantes'
                    }
                },
                {
                    title: 'Autre',
                    slug: 'autre',
                    subCategory: {
                        title: 'Interventions',
                        slug: 'interventions'
                    },
                    category: {
                        title: 'Dépenses Courantes',
                        slug: 'depenses-courantes'
                    }
                }
            ]
        },
        {
            title: 'Equipements',
            slug: 'equipements',
            icon: 'fa fa-tv',
            icons: [],
            services: [
                {
                    title: 'Meubles - Déco',
                    slug: 'meubles-deco',
                    subCategory: {
                        title: 'Equipements',
                        slug: 'equipements'
                    },
                    category: {
                        title: 'Dépenses Courantes',
                        slug: 'depenses-courantes'
                    }
                },
                {
                    title: 'Literie - Linge',
                    slug: 'literie-linge',
                    subCategory: {
                        title: 'Equipements',
                        slug: 'equipements'
                    },
                    category: {
                        title: 'Dépenses Courantes',
                        slug: 'depenses-courantes'
                    }
                },
                {
                    title: 'Electroménager',
                    slug: 'electromenager',
                    subCategory: {
                        title: 'Equipements',
                        slug: 'equipements'
                    },
                    category: {
                        title: 'Dépenses Courantes',
                        slug: 'depenses-courantes'
                    }
                },
                {
                    title: 'Multimédia - Téléphonie',
                    slug: 'multimedia-telephonie',
                    subCategory: {
                        title: 'Equipements',
                        slug: 'equipements'
                    },
                    category: {
                        title: 'Dépenses Courantes',
                        slug: 'depenses-courantes'
                    }
                },
                {
                    title: 'Brico - Jardinage',
                    slug: 'brico-jardinage',
                    subCategory: {
                        title: 'Equipements',
                        slug: 'equipements'
                    },
                    category: {
                        title: 'Dépenses Courantes',
                        slug: 'depenses-courantes'
                    }
                },
                {
                    title: 'Sport - Loisir',
                    slug: 'sport-loisir',
                    subCategory: {
                        title: 'Equipements',
                        slug: 'equipements'
                    },
                    category: {
                        title: 'Dépenses Courantes',
                        slug: 'depenses-courantes'
                    }
                },
                {
                    title: 'Autre',
                    slug: 'autre',
                    subCategory: {
                        title: 'Equipements',
                        slug: 'equipements'
                    },
                    category: {
                        title: 'Dépenses Courantes',
                        slug: 'depenses-courantes'
                    }
                }
            ]
        },
        {
            title: 'Conciergerie',
            slug: 'conciergerie',
            icon: 'fa fa-bed',
            icons: [],
            services: [
                {
                    title: 'Ménage & Linge',
                    slug: 'menage-linge',
                    subCategory: {
                        title: 'Conciergerie',
                        slug: 'conciergerie'
                    },
                    category: {
                        title: 'Dépenses Courantes',
                        slug: 'depenses-courantes'
                    }
                },
                {
                    title: 'Gardiennage',
                    slug: 'gardiennage',
                    subCategory: {
                        title: 'Conciergerie',
                        slug: 'conciergerie'
                    },
                    category: {
                        title: 'Dépenses Courantes',
                        slug: 'depenses-courantes'
                    }
                },
                {
                    title: 'Jardinage',
                    slug: 'jardinage',
                    subCategory: {
                        title: 'Conciergerie',
                        slug: 'conciergerie'
                    },
                    category: {
                        title: 'Dépenses Courantes',
                        slug: 'depenses-courantes'
                    }
                },
                {
                    title: 'Autre',
                    slug: 'autre',
                    subCategory: {
                        title: 'Conciergerie',
                        slug: 'conciergerie'
                    },
                    category: {
                        title: 'Dépenses Courantes',
                        slug: 'depenses-courantes'
                    }
                }
            ]
        },
    ];

    public DepensesExceptionnelles = [
        {
            title: 'Transactions',
            slug: 'transactions',
            icon: '',
            icons: [],
            services: []
        },
        {
            title: 'Sinistres',
            slug: 'sinistres',
            icon: '',
            icons: [],
            services: []
        },
        {
            title: 'Déménagement',
            slug: 'demenagement',
            icon: 'fa fa-car',
            icons: [],
            services: []
        },
        {
            title: 'Diagnostic',
            slug: 'diagnostic',
            icon: '',
            icons: [],
            services: []
        }
    ];

    public categories = [
        {
            title: 'Dépenses Contraintes',
            slug: 'depenses-contraintes',
            subCategories: this.DepensesObligatoire
        },
        {
            title: 'Dépenses Courantes',
            slug: 'depenses-courantes',
            subCategories: this.DepensesCourantes
        },
        {
            title: 'Dépenses Exceptionnelles',
            slug: 'depenses-exceptionnelles',
            subCategories: this.DepensesExceptionnelles
        }
    ];

    public services = [
        {
            id: 1,
            name: 'Travaux',
            img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAQQSURBVGhD7ZlbiA1xHMfdVi7LRhTJLat4cAlZCuWNfSC3XPKwKBEP4sWLWxG18kJbWiReWOW2eVPyQC7xoHghRcktyWXletbn95/vnszOzNnZ2TN7Rnzq2//M7//9XWb37OycOV1ayOVy09Fb9Lm5ubmBdTnqp+2/B4Y+zwn4IPYezZAl+zBzOQN/8cb3Q/ygbNmHeZd5YwfhRFbLln0Y9ozm9kH8K0uFeVjLUA+XkEUYrhcDf2INQPyKeVg3oHfoO+GTqI9LzhIMt9BNHQJ7D9EelFPIweFlpWcHhjql+doFeYtUIhsw0EvN5oP4DVSNzinkg/h1lcgGDPRKs/kgvkX7Q9EvhfMQM0a7IgmgRDkq3sWDYXa5yf7AmzE3Uhbz3NKWD+I7ZYkFKaPIqUfvlP8L3UZrOOwmWzIo0JNCD6xwCxzf1baD4x3a8kH8CUtX2QqCdx766GUGYa8R9ZY9GdSZSpEfXknHdm052JuieAD2ZssWCZ7xqEkpkeA5ppTkUGSfitmve6zCDsJdib2w/dYQr5ctEjyB+7gw8BkTlZYM6thbrJa1RiEf7NW7bq0g/gFFviXY64vsDiEWePcqNR1osEC9ArC3UrYAbI/zXPGg1jmlpgMNeqOoO+R7qL+sPohXyhYL/KeVmh40uah+AexkWAbJmodYd/bc5TYOeLcqNT1osk79QmH/ERouex5ih2QpCD67sg1RWnrQyP5wX3ttw2H/DZqrFAfhAcQee45o8GxSSvrQL/JDWAsM9JNlN2v+asbxCI7vO0MriH9D6b+lWkNT9z+nLfA9Q6t42d3yWLtxvAKdRXZrcg3tR2Nc4VJA8zo3bQzw2j/TA6yVSs8ODGZXo0tu0pjgN67zsgaVq1TpYZg+DBZ6Z9wW5H1CJ1CVypUWBhmM2rwiFYJ8+xA3SSVLB0NUotBPmnEhvwlNU8nSwRBVmikx1LDfbGn/dhhipjdOx6DOcZUsDQywQbN0GGotVdnOh+ax/6+0BbXsYeAwle5caHxTcxQF6l1lifU8oGjQ0G49Ih8sJIWanXv/RcN2fXiKC3XtI/JktUkfGi72WieD/AfI7pgDELfnzx17TBQXGu1R30RYPoq8o2bvsFqlC40uqGdS1qMy6tzxDv0QN+arXXrQ5Kl6JoL8atWxW52o72peosGuYRpQvD/yfX/SXkjPP5Tj9VqFA7DXyJLOJZnCs1yXDsCAA1XOwXHoVxkGextlKy4U3qweiSC/SaXy2Imh57L4MD/LOFmLB4XtK4GGpCI/9IpEfE6YX/I9ZP/34KcznZ+CPQbKnJhtCav7Cr0gGO2Z75/fnWQO5qvVuNHgq/Ds2YUTqdO40eD7fyKdRawTwdRP/szCjEc0bmEwbkNHM6q6XC434TchJKngv+7lswAAAABJRU5ErkJggg=='
        },
        {
            id: 2,
            name: 'Syndic',
            img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAO9SURBVGhD7Zo7aBRRFIYT4rOJgTTaGSwTCT5BCwULERFJl0QLBSubxEehhWhIGi00jcYELLUSooWIqJCU8dFoEUFb0wh5CCrEvPz+3LMSzczOnZm7uyn2g587e+85/z0n7s5sbqypUmWNs7S0tHVxcbETDaARNIF+ML/EKKbQJ/SEqR7Gw4wbLL2yqBAKOsM4yrjAmApyptEQ2muW5YUa1rF5N/rqSsoPXi/Qftui9LDZQfTR9g8KvgtoENXbduFhn1o2uILm3Lalgz0+o922dTjw1mfhkdumPLDfL3TCSsgPnmriubMvL+w7hzqslOzgpbfTQ2dbGdh/Fh2xkrKBz1VnV1loZJphu5WVDpIPoJJ/sH2hljcMdVaeHyToOVGSW2weqKnLSvSDhG7LXVNQ13fUaGUWh3jdpdI8sWeIn7Xr1JA7iebtZSLE9lmpxSH2rEvxYgY1YN6Kvrkpf8h5zKAf3Hk3kwyx+uBvsnLjIXDEpSRD7G+00/JakHczxKqJ9Zbb72b9IL5debEQo6/iqb7FqnjUonyNem1LsRCzsolrbtYfcoaVGwsBpyw2FSoeeTXDWq4mBHl6e8Xfigm450LTo+JR0WaYy91EAfJb5RMJ66MuLBsqHkU2w3WwJgQenfKKhMUJi8uMikf/NIOCNiHwuS6/SFhc/h07L1Z8oZkmpoI2IfDql2ckFhMEa2aHWauJy7YUBPwemPVqWEx9gBAHXn/fToLXXrdmX/AaMOvVsK4ndW5WNsH1JTVh18GaweeWPCNhcdziMoPHqg+2ikdBm8GjW36RsPjU4jJBfuzdScWjQjPNem1LmSD/uLwiYb3HhaUH48RbrIpHzRaTqxlyt8knEhYPWVwqyEtsooCKR7maIWdc+bEQsBFNWbwXxHs3UYC4XM0Qf0e5RSFo0OITIXaSYfkgmmuvJgqoeFRo5rRNe0H8LuUVhbg9LjwZDHXEeQHdtalUkKdmzqFnNuXDeys1GYxfWtJapM3KTIZG9qFgT/lQUNMYQ62V6QdJ91362oB65lH6g22S6tEX86k41NJrpaVHPwH007wqBjW8Ykh3yvg/mJxE3udOoWFvnXhusXLygZn+yJn5EC4r7PkBxX8VyQKGR5FOL8oCe71maLDtw4J5E3rrtioN+Osh28tlvs9EEmygk/ouxiC/hK0E3zEU/m+HxWDDRtSHcr/d8HjH0IbSPexCQhGbUTsaTtMUsePoNirvv4AP1FdHYTqZ70A3UD/S/2wYYu0m40V0DIW9E1WpUipqav4AotJzTmnDHeUAAAAASUVORK5CYII='
        },
        {
            id: 3,
            name: 'impot',
            img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAATkSURBVGhD7ZlbiFVVGMcHzaJQKanEelCnm4IhpNiDr2Gat25DUIRdpJdMoRd9GDUMKikSIYQk6UHUyF6k8CELySlQuviiPRRJaqV5a1C7eJvp91/zX5tzOsPsc/bZq5no/OE/3/r+6/u+tb7Zl7P3OW0ttDCE0NPTMx9+CL+HB+Bbvb297Z6uC8QPJ+95+A38A56E78GpDkkLFtrAJmqAfg7Oc9iAIPw6Ynf2ZYbcCx5q/Cdc4NA0YJ3nvNh5+AIcD6fCbdYvwIUO7xeEqYlPHP8znMdwBPYmqCMb69/qlPJB8R+90COWMiC/5Dk1M8dyFZi+irldjjsMJ3oqA9p2z6+xVC4oPM4L/GJJ2ir4HVwsn+nYzG+YG0NQBdBWeP4onAhHwe1wP7xHMdg5jtkZksoGhcd7gUP2r4E91oRnrcf/6DL5lUCLR/RejI7OZ/IFxpscM9d+mkaorbvMKS8yUxr2A/kC42+txY28Kz8C/1rr8R8xRb7A+DKcbX2HtZXyk4DiL3uRo5gJ8GrGW+ApGI4AdqZjjigmJAL8ldYPymeo3C/hWfiYY1YrBnQzHistCVhAi+/WSlidJtlGI9B1yoVTxjHt2E77FzEPOjQAf5gsc6sco5vF/DCZEiyiC7TLix6B9zMc7ukAfN1i4/nfrT/4F2F2t0Mahj8GToGbHKMmHnZIerCYmglHRmB8CZ6Gcx3yz2YUs9RTce7Tvpk+4OsDdcDPoCRgbd11lsA9UNdM/I/22wxWR+82a/H0VPOfwzdwa07TQQGbed2bqzrHGd8Cv/Ccmtnj8TE42WFDC2ysspmF8E6oZ6fdsPI0O4aZ5LShCTa51ptVM0vhGahnsZrTzCnlgzXayyCb3IqNzWR3IaTKZvSYMoNhvzXySO7NLlsLAkoHC6qZyttu1kwzoMYWl6yFAy5jvorEPyO9GVCjqWaIPYiJ+zlkbeBGQLdd+deTcLpPbg7U0Qfioy7dUDPEdTpN1+Dj1upvhOBXrZUC6l3CdLh8I83o2WuMcrD1NwInELgOZq+gRUC+Ni57JQiAsU7dhpshZj+mA7vIfu41cgVqscIgfy/U4/w0+11wMtxoX4/t4YlXQGrkNPvLNveINAUW0OdIeIhkfLe1rrAAYPyKNTXzhOWGmhGITdcIxcNbXgT+7ci607xjKQA/vtfoyD9lWevfgHZSc3kgLk0jFP4JjnKpXJAS3+91ZJ62LP016XlI2Uh2i4xA0+vtNOxdljKg631Eb5FVzeB2SMsD8ckaqXmSRau5RiqB/mZIBox1k3kGhnf+PBBXfiMUPe8SVUDPa2RxKGDgC+FbmDwQl6SRwy5RBfS8Rh4IBQogVSO/ukQV6mjkoVCgAFI1oot1tMtkQMtr5MVQoADITXax13yFg6avRXfBdZaqgP6R0xsGucka2eEydYF4fZMfnsWKIGUjwiyXCkAeCe9Dn24pA1r2dWsRkJ+mEYHiJ+AdLqfN9nuN4C8PCU2AGukaEVhA3wOH93RsVSPY0TD8mNMsqDNwIwTo16JOeDxkFAT5+m3wbY9/gBthU6/N5O+Dmz3OPSLhDRE7kuDsd77BBnt5UvvCNv6qy3gSCYXvLGWBPXzsLdXfCAG/Y/QEGoj/tfTBBHvQy1jcz3praS/2fwt5jbz/XyGNZD9TtNBCC/8btLX9De7kghQOuuqPAAAAAElFTkSuQmCC'
        },
        {
            id: 4,
            name: 'Assurance',
            img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAPXSURBVGhD7Zg5aBRhGIYTL7xIUCQeBARNihRBEESMhSJikSJNwEIQRJNSCwuNKFhoKdFCbURBUBDBSCISgohREUWsVERUtFARPONZxLjx+WbfrLPZyc4/s5s9ZB94mf//rvm+DNk5qipUKCCjo6O1qCxIJBIn1XYm+L1BCDI+l6h+BA6Cbd6YcC5V0Fe/vVREX3PQFtaBg5QNNH8+1iAEf0NBl3cyNazTZ4Av+iAEtiskMuTOosQUbSNhuag/2UU62KMNQtCA3E6QMoWczagPfVCN3+gFOoaaFOoE8Y2Wb3X8YHMfxAqgNXKHQmwTuqf0QFTzCMvpSguF+BPJ7H9gCx8ExzC6gFbKFQqxq9BHlQiF2KscZis9K8TZVd6OHnrJwDr7IBhtiEaZnCBtETnvLD8K5JxSCWfIOazc0CsypK0zFOpRbmTIbVUZJ3zN53cQiqxACeVGhtT7KuUE8ZM2yFHlxYYazSoXiq/56INgs3+2Om3TwP4kmRYfauxWuRSYZ2Cfr20KbPEGIagFvTEHx8douVxjA46YLxeocVolPdh3op/yXUGz5MppkGeye7Dvk8t8dTLnxLiaS1Daown7vXLHG4T1NILS7qrsn8pt/ry8s1Dzkkpao2tlToEtdcVYx74iduNKwb5bLg/2v+SKDTWOq5z1MJf926QnCfvUsx7r2IPMt0B0Bx3CP1MuD/aDXlYOUHerynmwb8J8EQ2y7pDZg328QcKgyB7lxYJ8e/ZaqHKh+JrP7yDEL6DQ92RqdMg9p1JO+JrP7yAGhQ4qNxLk/UQNKuOEr/nsg2A0drF0ejI1iJ1Kzk3Lj8g2lXCC+GWcx/vx4Rh6RTxw2iN5F6qWOyvE16AbXnIIxP1BO5UaCrH16LLlqYTV6Ef7tZ54EB/OfzVi7bHiAJrwJxmfPR2sU4oTxN9SeiD4wwch6BWHtJ/cMIi3zzU70Bk0gHpRN/b1KNL7O3mt5GSA/ROHB1KXwpNYQBAknUWbWG4spDhnO3rJOgPs59V2JoopC7IOgvNaHnRX5woE/5dx8XG1T21PDpygWT0Hgv+2QkubyiDFgoZq6Cvol6aT44Tgf8QhKK9FpQsLJ6/m5Oc45gx1RlCbShceerA7+fVkO/Eg30h7HykK9FJLI6lPmTFIvysXEwZZjJ6rMWfISX9GKgVoqgG9V4+hENvLYarSSwuaW42871HZIMYe953fd4oCTbahCT/a4bP/p1qFlzY024EyPmxjeo3qFVYe0Le9XfoZYgjnj9UlBY2ftAk42keGDTKXH8xgHyV6UPHu2vmCYZw+XlT4/6iq+gtHWcMdLOlaLwAAAABJRU5ErkJggg=='
        },
        {
            id: 5,
            name: 'Equipement',
            img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAM4SURBVGhD7ZlfaI1hHMcPMkb7Y0RKqe1CYnfuZiRi5GKEIjcKN26szS7QaklLUjYlVy7MDRculH+tnJHJhXYxK4UbTbIrEvbPNp/fe747ObNJ57zPc85TPvXted/f85zv9/dztuWcN/GfQmNycrJ+YmLiE+ussP+VpZv1gF5WeNDcx1S7/wbn2/XSwoLG3qtHa/K1yhmwVYaOsz+ic3XaKhzoa5sNgPpRrcozwv4pDXJfpTBhhnKGGELjXC9TOUwY4qHelX0qhQkDnNYgHSqFCQPUaJA+lcKEGYoY4jsaR0tVDhMG6LJ3BepVChMGOWtTsF5WKUyYYaMG6VUpTBhgAfqB7PekmpkqfYvcVWonNzB6jGFeoYcmtZM9mLTIL2/QQ6PayR5MNssvL5A/hlaonezBayFGQylb/5B9V63kDmZJ+XqH7D1qI3cwa5WvV8gdZClSG7mD4ZaUtV/IvaQW4gHDYjQsf2+QWa0W4gPTp/L3xUtFxwuDnFOAF8g7oeh4wXirMpxD1jCqUHS84L8I8+jbFdeQc0uxbiDgmbKcQs5ORbqBgPPKcgYZH1jmKdINhGxPxbmDjDbFuYOQxWhUmU7Af43i3ELQc2XGDt49inEPYW3KjR28jynGPYTVKTdW8LWvnkoV4x7CStCY8mMDz05F+IPQFwrvQ10x6A6qkr0/CL2gQVpUChMG2KVBkiqFCQOUop/IvvMqVjlMGKBH78pulcKEAU7aINCN5qgcHjRfxjADNglrEjWjg9zuz0a8di9ruez9QvgGlH5anCt4XZO1fwifevQwgh6g/qgr4No+59+eLuqfWW3/G7qH3up+AJXI2h9kz0VfCLdv6zdN1bi+qcYuRgd/g9pyZF+D2l+8dVbj6Hyuo4dKrM3RQZ8QWqXwdypFcL9D9UcqpaFWq70nKkVwf0T1Gyr5g9wlBNu7Yc/kV6psTZ2ZrSlqa7U3iNI/RlxfVd39B6uZILhTDbxBjagDjSIbsEbHMqAePXNh7UUN6Dqa+gfx88FqOgRXoIwPW9zbIA068gfsrUavdDyCe/tv/GEdyQ/0Yb/gh1A7akXrtTUrnLHHekfRFWQ/ipXa+guJxC+krehBVurLLAAAAABJRU5ErkJggg=='
        },
        {
            id: 6,
            name: 'Gaz',
            img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAQ7SURBVGhD1ZpZqE1hGIbPMQ8Hh0KGkCRDyhUKmUq5MiTJEDfKjfGgFEmKMt6QlKIoRIlwQ4oMGXKlKJnJcGEeMu3j+df/tjvrrHnY++zz1Ne/1/+93/t962xrD2urypP6+vraQqHwirjA4xptNz84gTmcgAOPr7PUKtW8YPh99jQsHN8jeijdfGDoBzqHImaP6CtJ5cOwgzW7B3JPWQZKWtkw7Fo7tj/kX7JU/skw6H07cjBonhH9VVJ5MNxYzRoJ2sdEZV4zzHfYjhkPTuQR0UfllQFzmTfBH3bE+FDzkOgum6aHYdZptsRQe4OljayaDgbpSLyzY6WD+qMs1bJsGhhijR0nG/hsk2X5yePZaAheS2RdXmi8XjPkAn4/WUbKvjzQtAfx2Y6QH3g+ZCnfx38auj7l5gneR9SmtNBoKPFHfUsC/vPVrnTQ5Iz6lQx6vCE6q2X+YD5JvVJB/Xs9jATtTrXNF7xbEHedLukZR3yyD8PhRH6zDFH7/MB4gW2RiVb4TCZ+6TgUdOfUPh/wbIGp52tsEqgvyM78UVZpOxRTA8NUlh3MZsk7NXi8lZ35w1RzbG4ZRYLuoMqyg9lt+aYGjzuyc+C4J/FR6UDQfCE6qiw9eE20ltlgmJOyLMLecqVDQTdXJenB5Ij8MoHPBlkWYdtc/HG+6x9VSTowaE98k18m8JkmWxfsz5MkEDTF6ysVprm8YoHefIL1wP4/optsXZA2z8pzqwxlgEqSQ4MdMolEw04hPCfDnutCbwz5zZIGgmam5Mmh+KJ8IkF7WTVbtVWEvS2OYQDkh0saCJrVkieH4tfyicNi1fQmXJ+OOY58U0PzQnJfyO+RNDkU/5NPKOg+EO1VZurOK2W4q+1QqDkuvS/kD0maDGprrEU0NNmtMgeOVyhlciu1HQq6jSrxhfwxSZNBbQdrEQ4NDINU5sCxcwuV9StLrB970C4yNUGQT/eMGCj2fTltCJrrkhdh27yk7icWaisStDOtoz/kt0uaHIqfyScQNHWSZwKf2bL0hXymV61T8gkEzWjJM4HPUln6Qn68pMmhOM6HunaSZ4JegW++5My11lrS5FDcD5PAOybkvkuaGbwuydYDuTOSpQeT0/LzQO6NZJnAqgavsJ8mJkqaHhqMIv7K0AX75lWtpaSpwSfwEzC5W5JlB7Nd8vVAboJkqcHjpuxcsP+XSH+RNwYz873kjvxdsH9WslRQP1VWHsjtkCw/MO1O+P2HAMMYyRJBnfkD+d6dYf8K0VbSfMG4F+H5Z8DeE5YuksWGuoPWwQ3711hKe1eeBm1otJcoOF0Fh+a7SwfJIkG/yVa6Yf8EUbr7vo2h2RjC9exwfJUl9GTIt0R3wCloAHvmq8AiycoL/auJGQxwkXCeIZbQVxnyrpt9HL8g6ohOkjQtDDKYmM5sob/Qku+KbjexjBgRpY9HVdV/XsoPRl/eh+4AAAAASUVORK5CYII='
        },
        {
            id: 7,
            name: 'EDF',
            img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAKjSURBVGhD7ZlPS1RhFMbHlKA2EUIEumoXCAYt2gi2EEODCANRkFpIYG1aBeo3cCOujBYtFIJo6QcIJNpofgFFRCoKo6CgQMKZfufOURhn5s690/vcSbk/eDjvn3POO4+Xd8bRQs5JoVQqXUBKXqN2P04Hh6iNGHozHCAzUiwWd9FXn5qZDj82PDRXGnlLuJaJGRpLjfgZejM0lRsxmGrN0DATIwZLOjM0q2uEQw/Q95T66eVVRgyWNWZoFGdk19MSQ1lfubq2EYOt8GZoEmfkA+FiGlEzRIyoZ8RgO6wZGmR2R45DSjgzFMc9kT9oO6U+eXlDIwZpYcxQqLwj64QrjUTeCPrN2GrmvFU6qI0zYj/dmofXEzWjxKah/qW/tHRQK7sjzSAxQtNm7khSffZjKmBdYiT1HUkKvW/7MRWojKS+I0lF70liFRIjrUD1RPYJ7xWi9xaxCpWRU3NH7J3lukL0fkKsQmKkFaieSH5HGkHv/I7UhNrTf0daQWZGOGgNPURT6J0vByMTIxyyQjj6Bsf4DGur0WYg5EY4YB91Ww3xMXrk43FPCQL95EaWLZ94AxnR93Fiv6cEgX5yI1OWT5z3+ZLPx6IEYPyMMECMPuyIxiuGd4nD6Ietx0GO3MiE5ROXfX7H54s+XyNE/wNhPIq+oGGbG+x1MN+23DjIkRuZsXziU2Qvug2dZ7yHfqHeqCGwfpZ5l48vM36BPjJuCHlyI6uWT+xEV712mvE3dMv3etA9GxuMB9FeuUMyyNcacfq8zOraOfQBumRzYhfaRDvoPnqODsplyaFG/kTsot70sgrY60c75cx/Iwsjh+9a3WgRzaIFtOEpQaCf3MgbZL+aHP1tV4HcSFbkRqjNjSjIjVB4DtmH1/+iSX9pOSeAQuEv2qINAPN1YZ8AAAAASUVORK5CYII='
        },
        {
            id: 8,
            name: 'Internet',
            img: 'data:image/png;base64,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'
        }
    ];

    public currentService;

    constructor() { }

    setCurrentService(service) {
        this.currentService = service ? { ...service } : undefined;
    }

    public all() {
        return this.categories;
    }

    public getCategories() {
        let categories = [];
        this.categories.map(category => {
            category.subCategories.map(s => {
                categories.push(s);
            });
        });
        return categories;
    }

    public getCategorySub(category: string) {
        return this.categories.filter(c => {
            return c.slug === category;
        })[0];
    }

    public getServices(category, subcategory) {
        return category.subCategories.filter(sub => {
            return sub.slug === subcategory;
        })[0].services;
    }

    public getService(category: string, subCategory, type) {
        return this.categories.find(c => c.slug === category)
            .subCategories.find(sub => sub.slug === subCategory)
            .services.find(service => service.slug === type);
    }

    getPropertyServicesByType(property: Property, slug) {
        this.source.load(property.services.filter(propservice => {
            return propservice.type.slug === slug;
        }).sort((a, b) => {
            return b.createdAt - a.createdAt;
        }));
        return this.source;
    }

    getAllPropertyServices(property: Property) {
        this.source.load(property.services.sort((a, b) => {
            return b.createdAt - a.createdAt;
        }));
        return this.source;
    }

    add(service, property: Property) {
        service.id = faker.random.number();
        service.createdAt = new Date();
        property.services.push(service);
        this.serviceCreated.next(service);
    }

    update(service, property: Property) {
        property.services = property.services.map(s => {
            if (s.id === service.id) {
                s = service;
            }
            return s;
        });
        this.refresh.next(property.services);
    }

    find(property: Property, id) {
        return property.services.filter(service => {
            return service.id === Number.parseInt(id);
        })[0];
    }

    remove(service, property: Property) {
        property.services = property.services.filter(s => {
            return service.id !== s.id;
        });
        this.source.load(property.services);
        this.refresh.next(this.source);
    }

}