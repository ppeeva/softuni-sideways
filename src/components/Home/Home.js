
export const Home = ({
    plansCount,
    visitsCount,
    sidewaysCount
}) => {
    return (
        <section >
            <h1>Pick up your journey</h1>
            <p>{sidewaysCount} sideways to choose from</p>
            <p>{plansCount} planned by users</p>
            <p>{visitsCount} already visited by adventurers</p>
        </section>
    );
};