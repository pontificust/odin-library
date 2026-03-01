export const cardClasses = {
    'main__card': {
        hasChildren: true,
        type: 'li',
        content: {
            'main__title': {
                hasChildren: false,
                type: 'p',
                content: 'Title',
            },
            'main__author': {
                hasChildren: false,
                type: 'p',
                content: 'Author'
            },
            'main__pages': {
                hasChildren: false,
                type: 'p',
                content: 'Pages'
            },
            'main__status': {
                hasChildren: true,
                type: 'div',
                content: {
                    'main__status-text': {
                        type: 'p',
                        content: 'Status',
                    },
                    'main__status-icon': {
                        type: 'img',
                        content: '',
                    },
                }
            },
            'main__switch': {
                hasChildren: true,
                type: 'label',
                content: {
                    'main__checkbox': {
                        type: 'input',
                        content: '',
                    },
                    'main__switch-slider': {
                        type: 'span',
                        content: '',
                    },
                }
            },
            'main__close-btn': {
                hasChildren: false,
                type: 'button'
            },
        }
    }
}

export let books = [];