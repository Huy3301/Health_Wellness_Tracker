import { Link } from 'react-router-dom';

const Home = ({ }) => {
    return (
        <div className="row justify-content-center p-4">
            <div className="col-8">
                <h1 className="text-center p-4"><b>Health Wellness Tracker</b></h1>
                <p className="text-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus aliquam at ex vel fermentum. Sed et felis dapibus nisi viverra ullamcorper et non dui. Praesent eget consequat tortor, at dapibus leo. Ut rhoncus sed nunc ac tristique. Donec nec maximus libero. Aliquam facilisis est neque, quis ultricies magna sodales non. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Duis justo metus, consectetur at arcu a, tincidunt varius purus.</p>
                <p>Etiam pretium, dolor eu interdum gravida, urna lacus commodo quam, ut semper nulla dolor quis dolor. Etiam nisi dui, maximus eget metus id, consequat maximus ipsum. Sed vulputate ante non mauris placerat congue. Ut vestibulum augue id egestas tincidunt. Curabitur facilisis nibh varius, tempor dolor a, vestibulum lectus. Aliquam dictum orci tellus, et dapibus arcu sagittis a. Pellentesque ac tincidunt turpis. Sed commodo sit amet dolor sed bibendum.</p>
            </div>
            <div className="row col-8 justify-content-center">
                {localStorage.getItem('isLoggedIn') === 'true' ? (
                    <p></p>
                ) : (
                    <Link className="btn btn-primary col-2 p-2" to="/login" >
                        Login
                    </Link>
                )}
            </div>
        </div>
    )
}

export default Home