const animateAppOpen = async (controls: any) => {
    await controls.start({
        filter: ['brightness(1)', 'brightness(0.5)', 'brightness(0.5)'],
        transition: {
            duration: 0.2,
            ease: 'easeOut'
        }
    });

    await controls.start({
        filter: 'brightness(1)',
        transition: { duration: 0.2 }
    });
}

const animateAppClose = async (controls: any) => {
    await controls.start({
        y: [0, -10, 0],
        filter: ['brightness(1)', 'brightness(0.5)', 'brightness(0.5)'],
        transition: {
            duration: 0.6,
            times: [0, 0.5, 1],
            ease: 'easeOut'
        }
    });

    await controls.start({
        filter: 'brightness(1)',
        transition: { duration: 0.2 }
    });
}    


export { animateAppOpen, animateAppClose };
