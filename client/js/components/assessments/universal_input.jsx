"use strict";

import React                from "react";

import RadioButton          from "../common/radio_button";
import Option               from "../common/option";
import TextField            from "../common/text_field";
import TextArea             from "../common/text_area";
import CheckBox             from "../common/checkbox";
import MappedImage          from "../common/mapped_image";
import Matching             from "../common/matching";
import DragAndDrop          from "../common/drag_and_drop";

export default class UniversalInput extends React.Component{

  static propTypes = {
    // Item to be displayed
    item: React.PropTypes.object.isRequired,

    selectAnswer: React.PropTypes.func.isRequired,

    // Whether or not entire question should be disabled
    isResult: React.PropTypes.bool,

    // Array of selected answer IDs
    response: React.PropTypes.array,

    // Graded user response object containing keys
    // correct:true/false, feedback:"Answer feedback"
    checkedResponse: React.PropTypes.object
  }

  wasSelected(id){
    if( this.props.response ){
      return this.props.response.indexOf(id) > -1;
    } else {
      return null;
    }
  }

  showAsCorrect(id){
    if(this.props.correctAnswers && this.props.correctAnswers[0] && this.props.correctAnswers[0].id){
      return this.props.correctAnswers[0].id.indexOf(id) > -1;
    } else {
      return null;
    }
  }

  render(){
    var item = this.props.item;
    var messages = '';
    var solution = '';
    var items = '';

    if(item.messages){
      var renderedMessages = item.messages.map(function(message){
        return (<li>{message}</li>);
      });
      messages = (
        <div className="panel-messages alert alert-danger" role="alert">
          <ul>
            {renderedMessages}
          </ul>
        </div>
      );
    }

    if(item.isGraded && item.solution){
      solution = (
        <div className="panel-footer text-center">
          <div dangerouslySetInnerHTML={{ __html: item.solution }} />
        </div>
      );
    }

    switch(item.question_type){
      case "edx_multiple_choice":
      case "multiple_choice_question":
      case "true_false_question":
        items = item.answers.map((answer) => {
          var selectRadio = _.curryRight(this.props.selectAnswer);
          var id = item.id + "_" + answer.id;
          var feedback;

          if(this.props.checkedResponse && this.wasSelected(answer.id)){
            feedback = this.props.checkedResponse.feedback;
          }

          var displayCorrect = (
            this.props.checkedResponse &&
            this.props.checkedResponse.correct === true &&
            this.wasSelected(answer.id)
          );

          var displayIncorrect = (
            this.props.checkedResponse &&
            this.props.checkedResponse.correct === false &&
            this.wasSelected(answer.id)
          );


          return (
            <RadioButton
              isDisabled={this.props.isResult}
              key={id}
              id={id}
              item={answer}
              name="answer-radio"
              checked={this.wasSelected(answer.id)}
              displayCorrect={displayCorrect}
              displayIncorrect={displayIncorrect}
              feedback={feedback}
              selectAnswer={selectRadio(true)}/>
          );
        });
        break;
      case "edx_dropdown":
        items = item.answers.map((answer) => {
          return <Option isDisabled={this.props.isResult} key={item.id + "_" + answer.id} item={answer} name="answer-option"/>;
        });
        break;
      case "matching_question":
        items = <Matching isDisabled={this.props.isResult} item={item} name="answer-option"/>;
        break;
      case "edx_numerical_input":
      case "edx_text_input":
        items = item.answers.map((answer) => {
          return <TextField isDisabled={this.props.isResult} key={item.id + "_" + answer.id} item={answer} name="answer-text"/>;
        });
        break;
      case "text_only_question":
        items = <TextArea />;
        break;
      case "multiple_answers_question":
        items = item.answers.map((answer) => {
          return <CheckBox isDisabled={this.props.isResult} key={item.id + "_" + answer.id} item={answer} name="answer-check" checked={this.wasSelected(answer.id)} showAsCorrect={this.showAsCorrect(answer.id)}/>;
        });
        break;
      case "edx_image_mapped_input":
        items = item.answers.map((answer)=>{
          return <MappedImage key={item.id + "_" + answer.id} item={answer} />;
        });
        break;
      case "edx_drag_and_drop":
        items = item.answers.map((answer)=>{
          return <DragAndDrop key={item.id + "_" + answer.id} item={answer} />;
        });
        break;
    }


    var material = '';
    if(item.edXMaterial){
      material = <div dangerouslySetInnerHTML={{ __html: item.edXMaterial }} />;
    }

    return (
      <div>
        <ul>
          {items}
        </ul>
      </div>
    );
  }
}
