import React, {Component} from "react"
import { Upload, Icon, Modal, message } from 'antd';

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}


export default class UploadHeader extends Component {

    constructor(props) {
        super(props)
        this.state = {
            previewVisible: false,
            previewImage: '',
            fileList: [
                // {
                //     uid: '-1',
                //     name: 'image.png',
                //     status: 'done',
                //     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                // },
            ],
        };

        if (props.headerImg) {
            this.state = this.state = {
                previewVisible: false,
                previewImage: '',
                fileList: [
                    {
                        uid: '-1',
                        name: props.headerImg,
                        status: 'done',
                        url: "http://localhost:5000/userImg/" + props.headerImg,
                    },
                ],
            };
        }

    }



    // 获取当前照片墙的所有, 图片名称
    _getHeaderImageName = () => {
        if (this.state.fileList.length > 0) {
            return this.state.fileList[0].name
        }
        return ""
    }



    handleCancel = () => this.setState({ previewVisible: false });

    handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
        });
    };

    handleChange = ({ file, fileList }) => {

        // console.log("当前被改变的文件", file);
        // console.log("当前改变后 最新的文件列表", fileList);


        // 删除图片 file.staus === "removed"

        // 上传图片 file.status = "uploading" "done"

        if (file.status === "done") {
            // 就代表, 这个图片已经上传完毕
            // 需要再这里判定是否上传成功
            if (file.response.status === 0) {
                // 图片上传成功
                message.success("图片上传成功")
                let name = file.response.data.name
                let url = file.response.data.url

                fileList[fileList.length - 1].name = name;
                fileList[fileList.length - 1].url = url;

            }

        }

        this.setState({ fileList })

    };


    render() {
        const { previewVisible, previewImage, fileList } = this.state;
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        return (
            <div className="clearfix">
                <Upload
                    accept="image/*"
                    action="api/uploadImg"
                    name={"file"}
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                >
                    {fileList.length >= 1 ? null : uploadButton}
                </Upload>
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </div>
        );
    }
}
