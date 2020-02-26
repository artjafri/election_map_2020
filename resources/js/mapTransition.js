import Highway from '@dogstudio/highway';
import { TimelineLite } from 'gsap';
import { Timeline } from 'gsap/gsap-core';


class Fade extends Highway.Transition{
    in({from,to,done}) {
        
        const tl = new TimelineLite();

        tl.fromTo(to, 0.5, { bottom: '-100%', right: '25%' }, { bottom: '0%' });

    }
    
    out(from, done) {
        done();
    }
}