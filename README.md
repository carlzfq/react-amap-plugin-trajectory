# Trajectory Plugin for [react-amap](https://elemefe.github.io/react-amap/)


### 参数配置

Map上要配置属性 useAMapUI
Trajectory 配置visible 和routeData

### 轨迹路线
```html
let routeData = [{
      name: '轨迹0',
      path: [
        [118.765364, 31.975531],
        [118.765771, 31.975604],
        [118.766083, 31.975604],
        [118.766533, 31.975658],
        [118.766533, 31.975658],
        [118.768057, 31.975822],
        [118.771544, 31.976095],
        [118.773389, 31.976286],
        [118.774408, 31.975868],
        [118.774591, 31.974521],
        [118.774966, 31.972983],
      ],
      desc:"鼠标停留在这，tip提示"
    }

### 使用：
 ```jsx
<Map plugins={['ToolBar']}  zoom={5} amapkey="xxxxxx" center={this.mapCenter} resizeEnable={true} useAMapUI={true}>
  <Trajectory visible={true} routeData={routeData}/>
	<Marker position ={this.mapCenter}/>
</Map>
