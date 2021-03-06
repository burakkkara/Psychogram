import { withFirebase } from '../../_firebase';
import React, { useEffect, useState } from 'react';
import { LoadingPage } from '../../components/Loadings';

const Home = props => {
    const { firebase } = props;
    const [pic, setPic] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        firebase
            .getPsychoPic()
            .getDownloadURL()
            .then(url => {
                setPic(url);
                setLoading(false);
            });
    }, [firebase]);

    return loading ? (
        <LoadingPage />
    ) : (
        <div className="homepage">
            <h2 className="content mb-4">You Are Not Alone</h2>
            <img className="pic mb-4" src={pic} alt="main" />
            <article>
                <h2 className="content mb-4">OUR SERVICES</h2>
                <br />
                <h3>ANXIETY AND RELATED DISORDERS</h3>
                <p>
                    At BHAVA Therapy Group, we believe the best approach to the
                    treatment of anxiety tends to symptoms on all three levels:
                    cognitive, physiological and emotional. As such, we employ
                    techniques from varying theories and philosophies including:
                    cognitive-behavioral, experiential, mindfulness and
                    medication when necessary to help you find a place in which
                    you can manage your anxiety and live fully and optimally.
                </p>
                <h3>COUPLES THERAPY & RELATIONSHIP COUNSELING</h3>
                <p>
                    The phrase “relationships take work” is a familiar one used
                    in our society but unfortunately not one that is often taken
                    to heart or appreciated in its fullest scope. What it
                    requires to actually work on a relationship is simple – a
                    willingness to be open, curious and honest with oneself and
                    ones partner, a willingness and sense of humility to not
                    always be “right” (not quite the same or synonymous with
                    being “wrong”), a sense of commitment to the process and of
                    course, a sense of humor can go a very very long way when
                    employed with good intention
                </p>
                <h3>DEPRESSION AND MOOD DISORDERS</h3>
                <p>
                    At BHAVA Therapy Group we strive to create a best fit
                    approach between the client’s unique needs and personality
                    structure and the intervention utilized. We work to equip
                    our clients with effective tools to manage their depressive
                    and mood disorders and gain greater sense of mastery and
                    control of their symptoms. The therapeutic relationship is
                    the cornerstone of all the interventions we utilize where
                    clients can feel safe, supported, accepted and understood.
                </p>
                <h3>ADOLESCENT AND YOUNG ADULT ISSUES</h3>
                <p>
                    At BHAVA Therapy Group we strive to help adolescents and
                    young adults understand that this process doesn’t have to
                    happen alone. Using techniques such as Motivational
                    Interviewing, Cognitive Behavioral Skill Building and
                    Mindfulness Training, we support and promote healthy
                    thinking patterns, teach conflict resolution and emotional
                    regulation skills, increase interpersonal awareness, and
                    provide a safe place to process their realities including
                    peer pressure and family discord.
                </p>
                <h3>COUPLES THERAPY & RELATIONSHIP COUNSELING</h3>
                <p>
                    The phrase “relationships take work” is a familiar one used
                    in our society but unfortunately not one that is often taken
                    to heart or appreciated in its fullest scope. What it
                    requires to actually work on a relationship is simple – a
                    willingness to be open, curious and honest with oneself and
                    ones partner, a willingness and sense of humility to not
                    always be “right” (not quite the same or synonymous with
                    being “wrong”), a sense of commitment to the process and of
                    course, a sense of humor can go a very very long way when
                    employed with good intention
                </p>
            </article>
        </div>
    );
};

export default withFirebase(Home);
