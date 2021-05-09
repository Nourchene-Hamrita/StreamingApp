const AdminBro = require('admin-bro');
const AdminBroExpress = require('admin-bro-expressjs');
const AdminBroMongoose = require('admin-bro-mongoose');
const mongoose = require('mongoose');
const User = require('../Models/user.model');
const Video = require('../Models/video.model');
const Channel=require('../Models/channel.model');
AdminBro.registerAdapter(AdminBroMongoose)
const adminBro = new AdminBro({
    databases: [mongoose],
    resources: [{
        resource: User,
        options: {
            properties: {
                picture: {
                    components: {
                        list: AdminBro.bundle('../components/picture'),
                        show: AdminBro.bundle('../components/picture'),
                    },
                }
            }
        },

    }, {
        resource: Video,
        options: {
            properties: {
                picture: {
                    components: {
                        list: AdminBro.bundle('../components/picture'),
                        show: AdminBro.bundle('../components/picture'),
                    },
                },
                link: {
                    components: {
                        show: AdminBro.bundle('../components/video'),

                    }
                }
            },
        }
    },
    {resource: Channel,
    options: {
        properties: {
            picture: {
                components: {
                    list: AdminBro.bundle('../components/picture'),
                    show: AdminBro.bundle('../components/picture'),
                },
            }
        }
    },

},
    ],
    rootPath: '/admin',
    branding: {
        logo: 'https://image.flaticon.com/icons/png/512/1688/1688433.png',
        companyName: 'Video-Streaming',
        favicon: 'https://image.flaticon.com/icons/png/512/1688/1688433.png',
        dashboard: { component: AdminBro.bundle('../components/Dashboard') },
        softwareBrothers: false,
        theme: {
            colors: {
                primary100: '#fa8072',
                primary80: '#fa8072',
                primary60: '#',
                primary40: '#fa8072',
                primary20: '#',
                accent: '#fa8072',
                hoverBg: '#fa8072',
                filterBg: '#4169e1',

            }
        }
    },

})
const Admin = {
    email: process.env.ADMIN_EMAIL || 'admin@gmail.com',
    password: process.env.ADMIN_PASS || '123'
}

const router = AdminBroExpress.buildAuthenticatedRouter(adminBro, {
    cookieName: process.env.ADMIN_COOKIE_NAME || 'admin',
    cookiePassword: process.env.ADMIN_COOKIE_PASS || 'hdhfgfgryryrfhfhddjdjdj',
    authenticate: async (email, password) => {
        if (email === Admin.email && password === Admin.password) {
            return Admin
        }
        return null
    }
})
module.exports = router;