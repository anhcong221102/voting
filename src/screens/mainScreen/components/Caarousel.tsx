import React, { memo, useState } from 'react';
import { colors } from 'assets';
import { CCarousel, CPaginationDot, Text } from 'components';
import { scale } from 'device';
import { Image, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import CFastImage from "components/CFastImage/CFastImage";
import { Config } from "utils";

const carouselWidth = scale(343);
const carouselHeight = scale(255);

type Props = {
  data: any;
  gotoDetail: (item: any) => void;
}
export const Caarousel = memo(({ data, gotoDetail }: Props) => {
  const [activatedItem, setActivatedItem] = useState<number>(0);
  const carouselRef = React.useRef(null);
  const onScrollEnd = (data: any, index: number) => {
    setActivatedItem(index);
  };

  const renderItem = (item: any) => {

    return (
      <TouchableWithoutFeedback onPress={() => gotoDetail(item.item)}>
        <View style={styles.containerCarousel}>
          <Image source={item?.item?.avatar} style={{
            width: scale(150),
            height: scale(210)
          }} />
          <View style={styles.containerText}>
            <Text semiBold style={styles.textTitle}>{item?.item?.title}</Text>
            <Text style={styles.textNormal}>Tác giả: <Text semiBold style={styles.textNormal}>{item?.item?.author}</Text></Text>
            <Text style={styles.textNormal}>Thể loại: <Text semiBold style={styles.textNormal}>{item?.item?.type}</Text></Text>
            <Text numberOfLines={8} style={[styles.textNormal, { width: '70%' }]}>{item?.item?.introduce}</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>

    );
  };

  const renderPagination = () => (
    <CPaginationDot
      length={data ? data.length : 0}
      activeDotSize={scale(8)}
      passiveDotSize={scale(8)}
      activeDotColor={colors.mainColor}
      passiveDotColor={colors.gray}
      dotSpace={scale(3)}
      borderWidth={0}
      active={activatedItem}
      style={{ position: 'absolute', bottom: scale(-10) }}
    />
  );

  return (
    <View style={{
      paddingHorizontal: scale(16),
      height: carouselHeight,
      width: '100%',
      backgroundColor: colors.gray2x,
      paddingBottom: scale(0)
    }}>
      <CCarousel
        ref={carouselRef}

        data={data}
        renderItem={renderItem}
        containerWidth={carouselWidth}
        itemWidth={carouselWidth}
        initialIndex={0}
        onScrollEnd={onScrollEnd}
      />
      {/*  {renderPagination()} */}
    </View>
  );
})

const styles = StyleSheet.create({
  containerStyle: {
    width: 0,
    height: 0,
    paddingVertical: scale(2),
    position: 'absolute',
    bottom: scale(8),
    alignSelf: 'center',
  },
  dotStyle: {
    width: scale(5),
    height: scale(5),
    backgroundColor: colors.white,
  },
  containerCarousel: {
    position: 'absolute',
    bottom: scale(20),

    flexDirection: 'row',
    alignItems: 'center'
  },
  containerText: {
    width: '70%',
    paddingHorizontal: scale(10)
  },
  textTitle: {
    flexWrap: 'wrap',
    width: '75%',
    fontSize: scale(17),
    textTransform: 'uppercase',
    color: colors.textColor,
  },
  textNormal: {
    fontSize: scale(14.5),
    color: colors.textColor,
    marginTop: scale(3)
  }
});
