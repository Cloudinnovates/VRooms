import React, { Component } from "react";
import ReactDOM from "react-dom";
import API from "../../../utils/API";
import Dropzone from "react-dropzone";

class FileDrop extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fileStatus: "no-file",
            file: "",
            bits: "",
            accepted: [],
            rejected: []
        };
    }

    handleInputChange = event => {
        event.preventDefault();
        const value = event.target.value;
        const name = event.target.name;
        console.log(name, value);

        this.setState({
            [name]: value
        });
    };

    onDrop = (acceptedFiles, rejectFiles) => {
        console.log(">>> onDrop");
        const file = acceptedFiles[0];

        const acceptedTypes = ["image/jpeg", "image/png"];
        const mimetype = file.type;

        // Continue if file's type is accepted
        if (acceptedTypes.indexOf(mimetype) >= 0) {
            const reader = new FileReader();
            if (file) {
                reader.readAsDataURL(file);
            }
            reader.onload = () => {
                const raw = reader.result;
                let bits = raw;
                this.setState({
                    bits: bits,
                    fileStatus: "photo-ready",
                    fileName: file.name,
                    fileSize: file.size
                });
                // Send this.state to parent handler, which inserts
                // all of these states into the parent's state
                this.props.handleFileUpload(this.state);
            };
            reader.onabort = () => console.log("file reading was aborted");
            reader.onerror = () => console.log("file reading has failed");
        } else {
            alert("invalid file type");
        }
    };

    render360 = () => {
        return (
            <div className="filedrop-wrap">
                <Dropzone className="dropzone" onDrop={this.onDrop.bind(this)}>
                    <div className="dropzone-content">
                        <div className="feature-icon">
                            <img
                                className="img-icon"
                                src="/assets/graphics/360-photo-o-black.svg"
                            />
                        </div>
                        <div className="direction-wrap">
                            <h4 className="direction-headline">
                                {" "}
                                Drag & Drop{" "}
                            </h4>
                            <p className="direction-subheadline">
                                or click to browse your files.
                            </p>
                        </div>
                    </div>
                </Dropzone>
                <figure
                    id="filedrop-preview"
                    className={"img-canvas " + this.state.fileStatus}
                    style={{ backgroundImage: `url("${this.state.bits}")` }}
                />
            </div>
        );
    };

    renderThumbnail = () => {
        return (
            <div className="filedrop-wrap thumbnail-wrap">
                <Dropzone
                    className="dropzone thumbnail-dropzone"
                    onDrop={this.onDrop.bind(this)}
                >
                    <div className="dropzone-content thumbnail-content">
                        <div className="feature-icon thumbnail-icon">
                            <img
                                className="img-icon thumbnail-icon"
                                src="/assets/graphics/thumbnail_600x400.svg"
                            />
                        </div>
                        <div className="direction-wrap">
                            <h4 className="direction-headline">
                                {" "}
                                Drag & Drop{" "}
                            </h4>
                            <p className="direction-subheadline">
                                or click to browse your files.
                            </p>
                        </div>
                    </div>
                </Dropzone>
                <figure
                    id="filedrop-preview"
                    className={"img-canvas " + this.state.fileStatus}
                    style={{ backgroundImage: `url("${this.state.bits}")` }}
                />
            </div>
        );
    };

    render() {
        return this.props.type === "360"
            ? this.render360()
            : this.renderThumbnail();
    }
}

export default FileDrop;
