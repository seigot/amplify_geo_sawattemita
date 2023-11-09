import './SampleButton.css';
import React from 'react';

class SampleButton extends React.Component {
    // コンストラクター
    constructor(props) {
	super(props);
	// テキストの初期値設定
	this.state = {
	    text: 'OK',
	};
    }

    // クリックイベントで実行する処理
    handleClick() {
	const samplebutton = document.getElementById(this.props.id);

	if (!samplebutton.classList.contains('sampleButton-ng')) {
	    // テキストの変更
	    this.setState(state => ({
		text: 'NG'
	    }));
	    // クラスの追加
	    samplebutton.classList.add('sampleButton-ng');
	} else {
	    // テキストの変更
	    this.setState(state => ({
		text: 'OK'
	    }));
	    // クラスの追加
	    samplebutton.classList.remove('sampleButton-ng');
	}
    }

    render() {
	// ボタンを複数個使用する場合はidで判別するため、決め打ちではなく上位から受け取ったもの指定にする
	return (
	    <div onClick={this.handleClick.bind(this)} className="sampleButton-ok" id={this.props.id}>
		{this.state.text}
	    </div >
	)
    }
}

export default SampleButton;
