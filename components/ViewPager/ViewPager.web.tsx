/* eslint-disable */
import React, {
  useImperativeHandle
} from 'react'

const ViewPager = ({ children, ref }) => {
  // const scrollView = useRef<ScrollView>(null)
  // const dataOrientation = orientation === `vertical`
  //   ? { 'data-snap-container-vertical': true }
  //   : { 'data-snap-container-horizontal': true }

  useImperativeHandle(ref, () => ({
    setPage: () => {
      console.log(`set page`)
    },
    // snapToItem: () => {
    //   scrollView.current.scrollToEnd()
    // },
  }))

  // const [hasUpdated, setUpdated] = useState(false)

  // useEffect(() => {
  //   if (!hasUpdated) {
  //     scrollView.current.scrollToEnd()
  //     setUpdated(true)
  //   }
  // }, [hasUpdated, setUpdated])

  const elmts = React.Children.toArray(children)

  return elmts[1]
  // return (
  //   <ScrollView
  //     style={style}
  //     contentContainerStyle={{ flex: 1 }}
  //     horizontal={orientation != `vertical`}
  //     nestedScrollEnabled
  //     onLayout={onLayout}
  //     {...dataOrientation}
  //     ref={scrollView}
  //   >
  //     {elmts.map((el) => (
  //       <View key={el.key} style={{ height: `100%`, width: `100%` }} data-snap-child>
  //         {el}
  //       </View>
  //     ))}
  //   </ScrollView>
  // )
}

export default ViewPager
