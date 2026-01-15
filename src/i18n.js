import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
    en: {
        translation: {
            nav: {
                home: 'Home',
                about: 'About',
                skills: 'Skills',
                projects: 'Projects',
                contact: 'Contact',
                blog: 'Blog'
            },
            hero: {
                role: 'FRONTEND DEVELOPER & MENTOR',
                tagline: 'Building modern, scalable, and user-friendly web applications. Passionate about crafting exceptional digital experiences and mentoring the next generation of developers.',
                view_projects: 'View Projects',
                contact_me: 'Contact Me'
            },
            about: {
                title: 'About Me',
                bio: "I'm a Frontend Developer and Mentor with a passion for building high-quality commercial projects and helping others grow in their tech journey.",
                p1: "Hello! I'm Jurabek, a frontend developer who enjoys building things that live on the internet. My journey in web development evolved from a curiosity about how things work to a professional career focused on building high-quality commercial projects.",
                p2: 'Currently, I serve as a Mentor at the "Al-Khwarizmi Heirs" project, where I guide aspiring developers through the complexities of modern frontend engineering.',
                focus: 'Focus Areas',
                commercial: 'Commercial UX',
                mentoring: 'Mentoring',
                scalable: 'Scalable Architectures',
                performance: 'Performance'
            },
            skills: {
                title: 'Skills & Expertise'
            },
            experience: {
                title: 'Experience & Mentorship',
                mentor_role: 'Mentor @ Al-Khwarizmi Heirs',
                dev_role: 'Frontend Developer',
                current: 'Current',
                commercial: 'Commercial Work'
            },
            projects: {
                title: 'Projects',
                view_case: 'View Case Study',
                problem: 'The Problem',
                solution: 'The Solution'
            },
            snippets: {
                title: 'Code Gallery',
                subtitle: 'Useful Snippets',
                copy: 'Copy',
                copied: 'Copied!'
            },
            social_proof: {
                title: 'Community Voices'
            },
            contact: {
                success_message: 'Your message has been sent successfully!',
                error_message: 'Failed to send message. Please try again later.',
                loading_message: 'Sending message...',
                title: 'Get In Touch',
                subtitle: "I'm currently looking for new opportunities and collaborations. Whether you have a question or just want to say hi, my inbox is always open!",
                name: 'Name',
                email: 'Email',
                message: 'Message',
                send: 'Send Message'
            }
        }
    },
    uz: {
        translation: {
            nav: {
                home: 'Bosh sahifa',
                about: 'Men haqimda',
                skills: 'Ko\'nikmalar',
                projects: 'Loyihalar',
                contact: 'Aloqa',
                blog: 'Blog'
            },
            hero: {
                role: 'FRONTEND DASTURCHI VA MENTOR',
                tagline: 'Zamonaviy, kengaytiriladigan va foydalanuvchilar uchun qulay veb-ilovalarni yaratish. Murakkab raqamli tajribalarni shakllantirish va yangi avlod dasturchilariga mentorlik qilishga ishtiyoqmandman.',
                view_projects: 'Loyihalarni ko\'rish',
                contact_me: 'Men bilan bog\'lanish'
            },
            about: {
                title: 'Men haqimda',
                bio: "Men Frontend dasturchi va mentorman. Yuqori sifatli tijorat loyihalarini yaratish va boshqalarga texnologiya sohasida o'sishga yordam berishga ishtiyoqmandman.",
                p1: "Salom! Men Jo'rabekman, internetda yashaydigan narsalarni yaratishdan zavqlanadigan frontend dasturchiman. Veb-ishlab chiqishdagi sayohatim narsalar qanday ishlashiga bo'lgan qiziqishdan yuqori sifatli tijorat loyihalarini yaratishga qaratilgan professional karyeraga aylandi.",
                p2: 'Hozirda men "Al-Xorazmiy vorislari" loyihasida mentor sifatida faoliyat yuritaman, u yerda intiluvchan dasturchilarni zamonaviy frontend injiniringining murakkabliklari bo\'yicha boshqaraman.',
                focus: 'Asosiy yo\'nalishlar',
                commercial: 'Tijorat UX',
                mentoring: 'Mentorlik',
                scalable: 'Masshtablanuvchi arxitektura',
                performance: 'Samaradorlik'
            },
            skills: {
                title: 'Ko\'nikmalar va tajriba'
            },
            experience: {
                title: 'Tajriba va Mentorlik',
                mentor_role: 'Mentor @ Al-Xorizmiy vorislari',
                dev_role: 'Frontend Dasturchi',
                current: 'Hozirgi',
                commercial: 'Tijorat ishlari'
            },
            projects: {
                title: 'Loyihalar',
                view_case: 'Keysni ko\'rish',
                problem: 'Muammo',
                solution: 'Yechim'
            },
            snippets: {
                title: 'Kod Namunalar',
                subtitle: 'Foydali parchalar',
                copy: 'Nusxa',
                copied: 'Nusxalandi!'
            },
            social_proof: {
                title: 'Jamoatchilik fikri'
            },
            contact: {
                title: 'Aloqaga chiqing',
                subtitle: "Hozirda yangi imkoniyatlar va hamkorliklar uchun ochiqman. Savolingiz bo'lsa yoki shunchaki salom bermoqchi bo'lsangiz, xabaringizni kutaman!",
                name: 'Ism',
                email: 'Email',
                message: 'Xabar',
                send: 'Xabar yuborish'
            }
        }
    },
    ru: {
        translation: {
            nav: {
                home: 'Главная',
                about: 'Обо мне',
                skills: 'Навыки',
                projects: 'Проекты',
                contact: 'Контакты',
                blog: 'Блог'
            },
            hero: {
                role: 'FRONTEND РАЗРАБОТЧИК И МЕНТОР',
                tagline: 'Создание современных, масштабируемых и удобных веб-приложений. Увлечен созданием исключительного цифрового опыта и наставничеством следующего поколения разработчиков.',
                view_projects: 'Посмотреть проекты',
                contact_me: 'Связаться со мной'
            },
            about: {
                title: 'Обо мне',
                bio: "Я Frontend разработчик и ментор, увлеченный созданием высококачественных коммерческих проектов и помощью другим в их профессиональном росте.",
                p1: "Привет! Я Журабек, фронтенд-разработчик, которому нравится создавать вещи, живущие в интернете. Мой путь в веб-разработке превратился из любопытства к тому, как все устроено, в профессиональную карьеру, ориентированную на создание высококачественных коммерческих проектов.",
                p2: 'В настоящее время я работаю ментором в проекте «Наследники Аль-Хорезми», где обучаю начинающих разработчиков тонкостям современного фронтенд-инжиниринга.',
                focus: 'Направления',
                commercial: 'Коммерческий UX',
                mentoring: 'Менторство',
                scalable: 'Масштабируемая архитектура',
                performance: 'Производительность'
            },
            skills: {
                title: 'Навыки и экспертиза'
            },
            experience: {
                title: 'Опыт и Менторство',
                mentor_role: 'Ментор @ Наследники Аль-Хорезми',
                dev_role: 'Frontend Разработчик',
                current: 'Настоящее время',
                commercial: 'Коммерческая работа'
            },
            projects: {
                title: 'Проекты',
                view_case: 'Кейс',
                problem: 'Проблема',
                solution: 'Решение'
            },
            snippets: {
                title: 'Галерея кода',
                subtitle: 'Полезные фрагменты',
                copy: 'Копировать',
                copied: 'Скопировано!'
            },
            social_proof: {
                title: 'Мнение сообщества'
            },
            contact: {
                title: 'Связаться',
                subtitle: "В настоящее время я открыт для новых возможностей и сотрудничества. Если у вас есть вопрос или вы просто хотите поздороваться, я всегда на связи!",
                name: 'Имя',
                email: 'Email',
                message: 'Сообщение',
                send: 'Отправить'
            }
        }
    }
};

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;
