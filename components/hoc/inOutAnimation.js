import { motion } from 'framer-motion';
const inOutAnimation = function(Comp){
    return class InOutAnimation extends React.Component {
        render() {
            return ( 
                <motion.div initial="hidden"  animate="visible"  exit="pageExit" variants={{
                    hidden: {
                        opacity: 0,
                    },
                    visible: {
                        opacity: 1,
                        transition: {
                            delay: .5,
                            duration: .3,
                        }
                    },
                    pageExit: {
                        opacity: 0
                    }
                }}>
                    <Comp {...this.props}/>
                </motion.div> 
            )
        }
    }
}

export default inOutAnimation;