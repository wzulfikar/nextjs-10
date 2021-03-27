import FadeInTransition from '@src/components/base/transitions/FadeIn';
import CollapseTransition from '@src/components/base/transitions/Collapse';
import FadeInScaleTransition from '@src/components/base/transitions/FadeInScale';
import PopOutTransition from '@src/components/base/transitions/PopOut';
import Rotate90Transition from '@src/components/base/transitions/Rotate90';
import SlideDownTransition from '@src/components/base/transitions/SlideDown';
import SlideOverTransition from '@src/components/base/transitions/SlideOver';

export default function TransitionPreview({
  fadeInTransition,
  collapseTransition,
  fadeInScaleTransition,
  popOutTransition,
  rotate90Transition,
  slideDownTransition,
  slideOverTransition,
}) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4 overflow-y-auto">
      <div className="bg-gray-400 px-4 py-4">
        <h4>FadeInTransition</h4>
        <FadeInTransition show={true} appear={fadeInTransition}>
          <div className="flex xy-center h-10 w-50 bg-blue-600 text-white">
            FadeInTransition
          </div>
        </FadeInTransition>
      </div>

      <div className="bg-gray-400 px-4 py-4">
        <h4>CollapseTransition</h4>
        <CollapseTransition show={true} appear={collapseTransition}>
          <div className="flex xy-center h-10 w-50 bg-blue-600 text-white">
            CollapseTransition
          </div>
        </CollapseTransition>
      </div>

      <div className="bg-gray-400 px-4 py-4">
        <h4>FadeInScaleTransition</h4>
        <FadeInScaleTransition show={true} appear={fadeInScaleTransition}>
          <div className="flex xy-center h-10 w-50 bg-blue-600 text-white">
            FadeInScaleTransition
          </div>
        </FadeInScaleTransition>
      </div>

      <div className="bg-gray-400 px-4 py-4">
        <h4>PopOutTransition</h4>
        <PopOutTransition show={true} appear={popOutTransition}>
          <div className="flex xy-center h-10 w-50 bg-blue-600 text-white">
            PopOutTransition
          </div>
        </PopOutTransition>
      </div>

      <div className="bg-gray-400 px-4 py-4">
        <h4>Rotate90Transition</h4>
        <Rotate90Transition show={true} appear={rotate90Transition}>
          <div className="flex xy-center h-10 w-50 bg-blue-600 text-white">
            Rotate90Transition
          </div>
        </Rotate90Transition>
      </div>

      <div className="bg-gray-400 px-4 py-4">
        <h4>SlideDownTransition</h4>
        <SlideDownTransition show={true} appear={slideDownTransition}>
          <div className="flex xy-center h-10 w-50 bg-blue-600 text-white">
            SlideDownTransition
          </div>
        </SlideDownTransition>
      </div>

      <div className="bg-gray-400 px-4 py-4">
        <h4>SlideOverTransition</h4>
        <SlideOverTransition show={true} appear={slideOverTransition}>
          <div className="flex xy-center h-10 w-50 bg-blue-600 text-white">
            SlideOverTransition
          </div>
        </SlideOverTransition>
      </div>
    </div>
  );
}
