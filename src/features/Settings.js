import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';
import { observable } from 'mobx';
import PerfectScrollbar from 'react-perfect-scrollbar'

import {  Switch, List, ListItemIcon, IconButton,Icon } from 'material-ui';
import { createStyleSheet, withStyles } from 'material-ui/styles';

import { ListItem, ListItemText, FaDiv, Fa } from 'material-son';

import findIndex from 'lodash.findindex';

const styleSheet = createStyleSheet('MsonSwitch',theme => ({
   bar: {
   },
   default: {
     color: theme.vplayer.disabledPrimary,
      '& + $bar': {
        backgroundColor: theme.vplayer.disabledSecondary,
      }
    },
    checked: {
      color: theme.vplayer.secondaryColor,
      '& + $bar': {
        backgroundColor: theme.vplayer.primaryColor,
        opacity: 1,
      },
    },
}));
const toggleSwichListItem = (classes, label ,store, index) => {
  return (
    <ListItem button onClick={(e)=>{ store[index] = !store[index] }}>
      <ListItemText primary={label} />
      <Switch
        classes={{
          bar: classes.bar,
          default: classes.default,
          checked: classes.checked,
        }}
        checked={store[index]} />
    </ListItem>
  );
}

@withStyles(styleSheet)
@inject('VideoPlayerStore') @observer
class Settings extends React.Component{

  @observable settingsListOpen  = false;

  static propTypes = {
    primaryColor: PropTypes.string.isRequired,
    classes: PropTypes.object.isRequired,
  }
  constructor(props){
    super(props);

    this.styles = {
      thumbOff: {
        backgroundColor: '#bdbdbd',
      },
      trackOff: {
        backgroundColor: '#5e5e5e',
      },
      thumbSwitched: {
        backgroundColor: '#f8f8f8',
      },
      trackSwitched: {
        backgroundColor: this.props.primaryColor,
      },
      labelStyle: {
        color: '#cccaca',
        fontSize: '13px'
      },
    };
  }
  render(){
    const {VideoPlayerStore, classes} = this.props;
    const {_prefix} = VideoPlayerStore;

    const maxHeight = 400;
    const speedArray = [
      {value: 0.25},
      {value: 0.5},
      {value: 0.75},
      {label: "Normal",value: 1},
      {value: 2},
      {value: 4}
    ];
    const styles = this.styles;
    const qualityArray = VideoPlayerStore.qualityArray;
    const currentQuality = qualityArray[VideoPlayerStore.urlIndex];
    const qualityLabel = `${(currentQuality.label || currentQuality.value+'p')} ${(currentQuality.fps && currentQuality.fps > 30) ? currentQuality.fps : ( (currentQuality.suffix) ? currentQuality.suffix : "" )}`;

    const toggleStyle = {
      thumbStyle: styles.thumbOff,
      trackStyle: styles.trackOff,
      thumbSwitchedStyle: styles.thumbSwitched,
      trackSwitchedStyle: styles.trackSwitched,
      labelStyle: styles.labelStyle
    }

    const currentSpeedIndex = speedArray[findIndex(speedArray,(o)=>{ return o.value == VideoPlayerStore.speed })];
    {/*settings*/}
    return (
        <Fa>
          {/*tooltip="Settings*/}
          <IconButton style={{height:36,padding:0}} onClick={()=>{
            VideoPlayerStore.isSettingsOpen = !VideoPlayerStore.isSettingsOpen;
            if(VideoPlayerStore.isSettingsOpen){
              document.addEventListener('click',this.settingsCloseDoc);
            }else{
              document.removeEventListener('click',this.settingsCloseDoc);
            }
          }}>
            <Icon>settings</Icon>
          </IconButton>
            <List className={`${_prefix}-settingsList ${(VideoPlayerStore.isSettingsOpen) ? "" : "invisible"}`} style={{maxHeight: `${maxHeight}px`}}>
              {(VideoPlayerStore.canBeAnnotation) ? toggleSwichListItem(classes,'Annotation' ,VideoPlayerStore, 'isAnnotation') : "" }
              {(VideoPlayerStore.canBeAutoQuality) ? toggleSwichListItem(classes,'Auto Quality' ,VideoPlayerStore, 'isAutoQuality') : "" }
              <ListItem
                button
                nestedItems={this.menuList(speedArray,this.chooseSpeed,VideoPlayerStore.speed)}
              >
                <ListItemText primary="Speed" secondary={currentSpeedIndex.label || currentSpeedIndex.value} />
              </ListItem>
              {
                (qualityArray.length > 1) ?
                  <ListItem
                      button
                      nestedItems={this.qualityList(qualityArray,this.chooseQuality,VideoPlayerStore.urlIndex)}
                      >
                    <ListItemText primary="Quality" secondary={qualityLabel} />
                  </ListItem> : ""
                }
            </List>
        </Fa>
    );
  }
  settingsCloseDoc  = (e) => {
    const {VideoPlayerStore} = this.props;
    const slist = e.target.closest(`.${VideoPlayerStore._prefix}-settingsList`);
    if(!slist){
      VideoPlayerStore.isSettingsOpen = false;
      document.removeEventListener('click',this.settingsCloseDoc);
    }
  }
  menuList = (itemArray,chooseVal,currentVal) => {
    return itemArray.map((a,i)=>{
      return (
        <ListItem
        button
        style={{...this.styles.labelStyle}}
        key={i}
        onTouchTap={()=>{
          chooseVal(a.value)
        }}
      >
        <ListItemText secondary={a.label || a.value} />
        <ListItemIcon><Icon>{(currentVal == a.value) ? "check" : ""}</Icon></ListItemIcon>
      </ListItem>
    )
    });
  }
  qualityList = (itemArray,chooseVal,urlIndex) => {
    const currentVal = itemArray[urlIndex].value;
    return itemArray.map((a,i)=>{
      return (
        <ListItem
        key={i}
        button
        style={{...this.styles.labelStyle}}
        onTouchTap={()=>{
          chooseVal(i)
        }}
      >
        <ListItemText primary={`${(a.label || a.value+'p')}`} secondary={(a.fps && a.fps > 30) ? a.fps : ( (a.suffix) ?  a.suffix : "" ) } />
        <ListItemIcon><Icon>{(currentVal == a.value) ? "check" : ""}</Icon></ListItemIcon>
      </ListItem>
    )
    });
  }

  chooseQuality = (index) => {
    const {VideoPlayerStore} = this.props;
    VideoPlayerStore.setSource(index);
  }
  chooseSpeed = (val) => {
    const {VideoPlayerStore} = this.props;
    VideoPlayerStore.setSpeed(val);
  }
  handleSettingsOpen = (open) => {
    const {VideoPlayerStore} = this.props;
    VideoPlayerStore.isSettingsOpen = open;
  }
}
export default Settings;
