const config = {
    theme: {
        extend: {
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
                    '50%': { transform: 'translateY(-20px) rotate(5deg)' },
                },
                'float-delayed': {
                    '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
                    '50%': { transform: 'translateY(-15px) rotate(-3deg)' },
                },
                'fade-in': {
                    from: { opacity: '0', transform: 'translateY(20px)' },
                    to: { opacity: '1', transform: 'translateY(0)' },
                },
                'fade-in-delayed': {
                    from: { opacity: '0', transform: 'translateY(20px)' },
                    to: { opacity: '1', transform: 'translateY(0)' },
                },
                'fade-in-slow': {
                    from: { opacity: '0', transform: 'translateY(30px)' },
                    to: { opacity: '1', transform: 'translateY(0)' },
                },
            },
            animation: {
                float: 'float 6s ease-in-out infinite',
                'float-delayed': 'float-delayed 8s ease-in-out infinite 2s',
                'fade-in': 'fade-in 0.8s ease-out forwards',
                'fade-in-delayed': 'fade-in-delayed 0.8s ease-out 0.3s forwards',
                'fade-in-slow': 'fade-in-slow 1s ease-out 0.6s forwards',
            },
        },
    },
    plugins: [],
};

export default config;
