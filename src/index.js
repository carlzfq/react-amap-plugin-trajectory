import React from 'react';

class Trajectory2 extends React.Component {

  constructor(props) {
    super(props);

    if (typeof window !== 'undefined') {
      if (!props.__map__) {
        throw new Error('Geolocation has to be a child of Map component');
      } else {

        this.map = props.__map__;
        this.element = props.__ele__;
        this.routeData = props.routeData;

        console.log("constructor ", props)
        this.resolveTrajectory(props);
      }
    }

  }

  shouldComponentUpdate() {
    return false;
  }

  componentWillReceiveProps(nextProps) {
    console.log("componentWillReceiveProps")
    const currentProps = this.props;
    this.resolveTrajectory().then(() => {
      this.refreshTrajectory(nextProps, currentProps);
    })
  }

  resolveTrajectory(props) {

    console.log("resolveTrajectory ", props)
    console.log("this.pathSimplifierIns ", this.pathSimplifierIns)
    if (this.pathSimplifierIns) {
      return new Promise((resolve) => {
        resolve(this.pathSimplifierIns);
      });
    } else {


      return new Promise((resolve) => {

        console.log("Promise ", props)
        var pathOption = this.buildProps(props)

        var _this = this;
        window.AMapUI.load(['ui/misc/PathSimplifier'], function (PathSimplifier) {

          if (!PathSimplifier.supportCanvas) {
            alert('当前环境不支持 Canvas！');
            return;
          }

          //创建组件实例
          _this.pathSimplifierIns = new PathSimplifier(pathOption);

          //这里构建两条简单的轨迹，仅作示例
          _this.pathSimplifierIns.setData(props.routeData);

          resolve(_this.pathSimplifierIns);
        });


      });
    }
  }


  refreshTrajectory(nextProps, currentProps) {
    if ('visible' in nextProps) {
      if (nextProps.visible) {
        this.pathSimplifierIns.show();
      } else {
        this.pathSimplifierIns.hide();
      }
    }

    const opts = {};

    if (nextProps.routeData !== currentProps.routeData ) {
      this.pathSimplifierIns.setData(nextProps.routeData);
    }
  }

  render() {
    return null;
  }

  componentWillUnmount() {
    this.pathSimplifierIns.hide();
    this.pathSimplifierIns.setData(null);
    delete this.pathSimplifierIns;
  }

  render() {
    return null;
  }


  buildProps = (props) => {

    var simProps = {
      zIndex: 100,
      map: ()=>{}, //所属的地图实例
      getPath: function(pathData, pathIndex) {
        //返回轨迹数据中的节点坐标信息，[AMap.LngLat, AMap.LngLat...] 或者 [[lng|number,lat|number],...]
        return pathData.path;
      },
      getHoverTitle: function(pathData) {
        //鼠标悬停在节点之间的连线上
        return pathData.desc;
      },
      renderOptions: {
        //轨迹线的样式
        pathLineStyle: {
          strokeStyle: 'red',
          lineWidth: 6,
          dirArrowStyle: true
        }
      }
    };

    console.log(props)

    if (props.zIndex) {
      simProps.zIndex = props.zIndex;
    }

    if (props.__map__) {
      simProps.map = props.__map__;
    }

    if (props.pathLineStyle) {
      simProps.renderOptions.pathLineStyle = props.pathLineStyle;
    }

    return simProps;
  }


}

module.exports = Trajectory2;
