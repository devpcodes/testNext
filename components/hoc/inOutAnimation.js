// import { motion } from 'framer-motion';
import { motion, AnimatePresence } from "framer-motion";
const inOutAnimation = function(Comp, isVisible){
    return class InOutAnimation extends React.Component {
        render() {
            return ( 
                <AnimatePresence>
                    {isVisible && (
                        <motion.div
                            key="login"
                            initial={{
                                opacity: 0, 
                            }}
                            animate={{
                                opacity: 1,
                            }}
                            exit={{
                                opacity: 0, 
                                transition: {
                                    delay: .5,
                                    duration: 1,
                                    ease: 'easeIn'
                                }
                            }}
                        >
                            <Comp {...this.props}/>
                        </motion.div> 
                    )}

                </AnimatePresence>
            )
        }
    }
}

export default inOutAnimation;