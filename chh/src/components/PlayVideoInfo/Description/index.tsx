import Comments from '../../Comments'

const Description = () => {
    return (
        <div className="vid-description">
            <p>Master - Starring Thalapathy Vijay, Vijay Sethupathi, Malavika Mohanan,</p>
            <p>Andrea Jeremiah, Shanthanu Bhagyaraj, Arjun Das</p>
            <hr />
            <h4>100K Comments</h4>
            <div className="add-comment">
                <img src="Project-images/logo.png" />
                <input type="text" placeholder="Write Comments..." />
            </div>
            <Comments />
        </div>
    )
}

export default Description
