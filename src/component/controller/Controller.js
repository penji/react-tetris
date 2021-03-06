import React from 'react';
import { connect } from 'react-redux';
import {Up, Left, Right, Down, Space, Switch, PauseResumeToggle} from './buttons';

import theme from '../../theme';

import styled from 'styled-components';
import {GAME_IS_ON, PAUSED, READY, RESUMED} from '../../action/game';

const StyledDiv = styled.div`
  position: absolute;
  box-sizing: border-box;
  background-color: ${props => props.theme.background};
  width: 320px;
  height: 160px;
  padding: 5px;
  bottom: 0px;
`;

StyledDiv.defaultProps = {
  theme: theme.BASE.controller.Controller
};

let Controller = ({button, pressed, changeButtonState, state, inversed}) => (
    <StyledDiv>
      <Up
          inversed={inversed}
          type={'UP'}
          pressed={button === 'UP' && pressed}
          onMouseTouchEvent={changeButtonState}
      />
      <Down
          inversed={inversed}
          type={'DOWN'}
          pressed={button === 'DOWN' && pressed}
          onMouseTouchEvent={changeButtonState}
      />
      <Left
          inversed={inversed}
          type={'LEFT'}
          pressed={button === 'LEFT' && pressed}
          onMouseTouchEvent={changeButtonState}
      />
      <Right
          inversed={inversed}
          type={'RIGHT'}
          pressed={button === 'RIGHT' && pressed}
          onMouseTouchEvent={changeButtonState}
      />
      <Space
          inversed={inversed}
          type={'SPACE'}
          pressed={button === 'SPACE' && pressed}
          onMouseTouchEvent={changeButtonState}
      />
      {
        state === READY &&
        <Switch
          type={'SWITCH'}
          pressed={button === 'SWITCH' && pressed}
          onMouseTouchEvent={changeButtonState}
        />
      }
      {
        (
            state === GAME_IS_ON
            || state === PAUSED
            || state === RESUMED
        ) &&
        <PauseResumeToggle
            type={'PAUSE_RESUME'}
            paused={state === PAUSED}
            pressed={button === 'PAUSE_RESUME' && pressed}
            onMouseTouchEvent={changeButtonState}
        />
      }
    </StyledDiv>
);

const mapStateToProps = state => ({...state.controller, ...state.game});

const mapDispatchToProps = dispatch => ({
  changeButtonState: (type, pressed) => {
    const action = {type: `${type}_${pressed ? 'TRUE' : 'FALSE'}`};
    return dispatch(action);
  }
});

Controller = connect(mapStateToProps, mapDispatchToProps)(Controller);

export default Controller;